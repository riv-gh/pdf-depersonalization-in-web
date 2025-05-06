const pkg=require('./../package.json');

const input=process.argv[2];
const oldVersion = pkg.version;
const inputFomatMessage = 'Version format: x.x.x (e.g., 1.0.0)\n"+" or "inc" for incrementing the patch version\n"get" for getting the current version';

if (!input) {
  console.error(`Version not specified. Usage: npm run set-version <version or command>\n${inputFomatMessage}`);
  process.exit(1);
}

if (!input.match(/(^\d+\.\d+\.\d+$)|(^\+$)|(^inc$)|(^get$)/)) {
  console.error(`Input <${input}> is incorrect.\n${inputFomatMessage}`);
  process.exit(1);
}

if (input === 'get') {
  console.log(`Current version: ${pkg.version}`);
  process.exit(0);
}

console.log('Setting version...');

if (input === '+' || input === 'inc') {
  pkg.version = pkg.version.split('.').map((v, i) => i === 2 ? parseInt(v) + 1 : v).join('.');
  console.log(`Incremented version from ${oldVersion} to ${pkg.version}`);
  applyNewVersion(pkg.version);
  process.exit(0);
}

if (input.match(/^\d+\.\d+\.\d+$/)) {
  applyNewVersion(input);
  process.exit(0);
}

function applyNewVersion(version) {
  require('fs').writeFileSync('package.json', JSON.stringify(pkg, null, 2));
  require('child_process').execSync(`git add package.json && git commit -m "Set version: ${version}" && git tag ${version}`, {stdio: 'inherit', cwd: '.'});
  console.log(`Set version: ${version}`);
}