const pkg=require('./../package.json');
if (!pkg.dockerhub) {
    console.error('dockerhub not specified in package.json. Format: "dockerhub": "<your-dockerhub-user>/pdf-depersonalization-in-web"');
    process.exit(1);
  }
console.log('Pushing Docker image...');
console.log(`Docker image name: ${pkg.dockerhub}`);
console.log(`Docker image tags: ${pkg.version}, latest`);
require('child_process').execSync(`docker push ${pkg.dockerhub}:latest && docker push ${pkg.dockerhub}:${pkg.version}`, {stdio: 'inherit' , cwd: '.'});
console.log(`Ending Docker push ${pkg.dockerhub} : ${pkg.version} (latest).`);