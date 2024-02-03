const { exec } = require("child_process");

function executeCommand(command) {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error}`);
      return;
    }

    if (stderr) {
      console.error(`Command stderr: ${stderr}`);
    }

    console.log(`Command output: ${stdout}`);
  });
}

// Example usage:
executeCommand("ls -l");

executeCommand("ls -la");
// Expected Output: (output of ls -la)

executeCommand('echo "Hello, Node.js!"');
// Expected Output: Hello, Node.js!