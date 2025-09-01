# Instructions

1. Create a folder outside of this repo, call it `deploy_from_here`
2. On the root of the project `vc link --repo`, link both projects
3. On the root of the project `vc build` and build `api`
4. Move the build to the deployment folder: `mv apps/api/.vercel ../deploy_from_here`
5. Try Deploy:

```bash
export VERCEL_VERSION=46.1.0
export VERCEL_ORG_ID=...
export VERCEL_PROJECT_ID=...
export VERCEL_ENV=stage
export VERCEL_TOKEN=....

# npx --yes vercel@$VERCEL_VERSION pull --token $VERCEL_TOKEN
npx --yes vercel@$VERCEL_VERSION deploy --token $VERCEL_TOKEN --yes --prebuilt --archive=tgz
```

You might see this output:

```bash
➜  deploy_from_here npx --yes vercel@$VERCEL_VERSION deploy --token $VERCEL_TOKEN --yes --prebuilt --archive=tgz
Vercel CLI 46.1.0
Error: The provided path “~/dev/graphy/deploy_from_here/apps/api” does not exist. To change your Project Settings, go to https://vercel.com/graphy-vercels-projects/hono-npm-monorepo-api/settings
```

You can try to create this folder to just silence this issue: 

```bash
mkdir -p apps/api`
```

But then you get this error:
```bash
➜  deploy_from_here npx --yes vercel@$VERCEL_VERSION deploy --token $VERCEL_TOKEN --yes --prebuilt --archive=tgz
Vercel CLI 46.1.0
⠋ Deploying graphy-vercels-projects/hono-npm-monorepo-api[Error: ENOENT: no such file or directory, lstat '/Users/canastro/dev/graphy/deploy_from_here/node_modules/@repo/logger'] {
  errno: -2,
  code: 'ENOENT',
  syscall: 'lstat',
  path: '/Users/canastro/dev/graphy/deploy_from_here/node_modules/@repo/logger'
}
Error: An unexpected error occurred!
Error: ENOENT: no such file or directory, lstat '/Users/canastro/dev/graphy/deploy_from_here/node_modules/@repo/logger'
```

You can copy the libs to node_modules to "fix" this:
```bash
mkdir node_modules
mkdir .vercel/output/functions/index.func/node_modules
cp -R .vercel/output/functions/index.func/libs node_modules/@repo 
cp -R .vercel/output/functions/index.func/libs .vercel/output/functions/index.func/node_modules/@repo 
```

And now:
```bash
➜  deploy_from_here npx --yes vercel@$VERCEL_VERSION deploy --token $VERCEL_TOKEN --yes --prebuilt --archive=tgz
Vercel CLI 46.1.0
🔍  Inspect: https://vercel.com/graphy-vercels-projects/hono-npm-monorepo-api/G28qXTyf3sQkxFNzcZZH3d3RdNQC [2s]
✅  Production: https://hono-npm-monorepo-cr560zv2w-graphy-vercels-projects.vercel.app [2s]
📝  Deployed to production. Run `vercel --prod` to overwrite later (https://vercel.link/2F).
💡  To change the domain or build command, go to https://vercel.com/graphy-vercels-projects/hono-npm-monorepo-api/settings
```

For some reason this one is failing a bit more because the "hono" package is not present in the node_modules of the build output. 
So its still failing in runtime.