const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router
    .get('/', ctx => {
        ctx.body = 'test';
    });

var child = require('child_process');
var util = require('util');
const exec = util.promisify(child.exec);
const source = `/home/ec2-user/zang.wei/deploy-test`;
router.post('/:repo', async (ctx) => {
  try {
    if (ctx.params.repo == 'videomaker.cool') {
      const ref = ctx.request.body.ref;
      if (ref.indexOf('master') != -1) {
        console.log(`git reset --hard && git clean -f`);
        await exec(`git reset --hard && git clean -f`, {
          cwd: source
        });
        console.log(`git checkout master`);
        await exec(`git checkout master`, {
          cwd: source
        });
        // console.log(`git pull`);
        // await exec(`git pull`, {
        //   cwd: source
        // });
        // console.log(`npm install`);
        // await exec(`npm install`, {
        //   cwd: source
        // });
        // console.log(`npm run build`);
        // await exec(`npm run build`, {
        //   cwd: source
        // });
        // console.log(`cp -f ${source}/dist/*.* cp ${dest}/dist/*.*`);
        // await exec(`cp -f ${source}/dist/*.* cp ${dest}/dist/*.*`);
        // await exec(`${appRoot}/scripts/deployVideoMakerCool.sh`);
      }
    } else {
      ctx.status = 400;
    }
    ctx.body = {
      result: 0
    }
  } catch (err) {
    console.log(err)
    ctx.body = {
      result: -1,
      err
    }
  }
});


app.use(router.routes());

app.listen(9010);