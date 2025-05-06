console.log('Setting version...');

const pkg=require('./../package.json');

const inputVersion=process.argv[2];
const oldVersion = pkg.version;

if (!inputVersion) {
  console.error(
    'Version not specified. Usage: npm run set-version <version>\n'+
    'Version format: x.x.x (e.g., 1.0.0) or "+" for incrementing the patch version'
  );
  process.exit(1);
}

if (inputVersion === '+') {
  pkg.version = pkg.version.split('.').map((v, i) => i === 2 ? parseInt(v) + 1 : v).join('.');
  console.log(`Incremented version from ${oldVersion} to ${pkg.version}`);
}
else if (!inputVersion.match(/^\d+\.\d+\.\d+$/)) {
  console.error('Version format is incorrect. Expected format: x.x.x (e.g., 1.0.0)');
  process.exit(1);
}
else {
  pkg.version = inputVersion;
  console.log(`Set version from ${oldVersion} to ${pkg.version}`);
}

require('fs').writeFileSync('package.json', JSON.stringify(pkg, null, 2));
equire('child_process').execSync(`git add package.json && git commit -m "Set version: ${pkg.version}" && git tag ${pkg.version}`, {stdio: 'inherit', cwd: '.'});
console.log(`Set version: ${pkg.version}`);