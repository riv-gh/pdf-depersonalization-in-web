const pkg=require('./../package.json');
if (!pkg.dockerhub) {
    console.error('dockerhub not specified in package.json. Format: "dockerhub": "<your-dockerhub-user>/pdf-depersonalization-in-web"');
    process.exit(1);
  }
console.log('Building Docker image...');
console.log(`Docker image name: ${pkg.dockerhub}`);
console.log(`Docker image tags: ${pkg.version}, latest`);
require('child_process').execSync(`docker build -t ${pkg.dockerhub}:latest -t ${pkg.dockerhub}:${pkg.version} .`, {stdio: 'inherit' , cwd: '.'});
console.log(`Ending Docker build ${pkg.dockerhub} : ${pkg.version} (latest).`);