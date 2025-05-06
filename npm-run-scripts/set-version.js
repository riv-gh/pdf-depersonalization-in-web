console.log('Setting version...');
const pkg=require('./../package.json');
pkg.version=process.argv[2];
if (!pkg.version) {
  console.error('Version not specified. Usage: node package-set-version.js <version>');
  process.exit(1);
}
require('fs').writeFileSync('./../package.json', JSON.stringify(pkg, null, 2));
require('child_process').execSync(`git add package.json && git commit -m "Set version: ${pkg.version}" && git tag ${pkg.version}`, {stdio: 'inherit'});
console.log(`Set version: ${pkg.version}`);