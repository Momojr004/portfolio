<?php
/**
 * GitHub Webhook Handler — Deployment trigger
 * 
 * Place this file on the server at ~/public_html/webhook/deploy.php
 * Set GITHUB_WEBHOOK_SECRET as an environment variable or in .env
 * 
 * Rate-limited to 1 deployment per 60 seconds.
 */

// --- Configuration ---
$secret       = getenv('GITHUB_WEBHOOK_SECRET') ?: 'CHANGE_ME';
$deployScript = '/home3/sc3emlc9189/deploy.sh';
$logFile      = '/home3/sc3emlc9189/deploy.log';
$rateLimitFile = __DIR__ . '/.last_deploy';
$rateLimitSeconds = 60;

// --- Rate limiting (file-based) ---
if (file_exists($rateLimitFile)) {
    $lastDeploy = (int) file_get_contents($rateLimitFile);
    if (time() - $lastDeploy < $rateLimitSeconds) {
        http_response_code(429);
        $wait = $rateLimitSeconds - (time() - $lastDeploy);
        echo json_encode(['error' => 'Rate limited', 'retry_after' => $wait]);
        exit;
    }
}

// --- Verify HTTP method ---
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// --- Verify GitHub signature ---
$payload   = file_get_contents('php://input');
$signature = $_SERVER['HTTP_X_HUB_SIGNATURE_256'] ?? '';

if (empty($signature)) {
    http_response_code(403);
    echo json_encode(['error' => 'Missing signature']);
    exit;
}

$expected = 'sha256=' . hash_hmac('sha256', $payload, $secret);

if (!hash_equals($expected, $signature)) {
    http_response_code(403);
    echo json_encode(['error' => 'Invalid signature']);
    exit;
}

// --- Verify event type ---
$event = $_SERVER['HTTP_X_GITHUB_EVENT'] ?? '';
if ($event === 'ping') {
    echo json_encode(['message' => 'pong']);
    exit;
}

if ($event !== 'push') {
    http_response_code(200);
    echo json_encode(['message' => 'Ignored event: ' . $event]);
    exit;
}

// --- Verify branch (main only) ---
$data = json_decode($payload, true);
$ref  = $data['ref'] ?? '';

if ($ref !== 'refs/heads/main') {
    echo json_encode(['message' => 'Ignored branch: ' . $ref]);
    exit;
}

// --- Record deployment time (rate limit) ---
file_put_contents($rateLimitFile, (string) time());

// --- Execute deployment ---
$timestamp = date('Y-m-d H:i:s');
$output    = [];
$returnVar = 0;

exec("bash $deployScript 2>&1", $output, $returnVar);

$logEntry = "[$timestamp] Deploy triggered by push to main\n"
          . "Exit code: $returnVar\n"
          . implode("\n", $output)
          . "\n---\n";

file_put_contents($logFile, $logEntry, FILE_APPEND);

http_response_code($returnVar === 0 ? 200 : 500);
echo json_encode([
    'status'    => $returnVar === 0 ? 'success' : 'failed',
    'exit_code' => $returnVar,
    'timestamp' => $timestamp
]);
