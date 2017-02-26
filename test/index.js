const test = require('tape');
const Logr = require('logr');


let lastMessage;
const logger = function(msg) {
  lastMessage = msg;
  //use for debugging
  //console.log(msg); //eslint-disable-line no-console
};

test('string with no tag', (t) => {
  t.plan(1);

  const log = Logr.createLogger({
    logger,
    reporters: {
      'cli-fancy': {
        reporter: require('../')
      }
    }
  });

  log('some string');
  t.equal(lastMessage, '               \x1b[90m  ::  \x1b[39msome string');
});

test('string with 1 tag', (t) => {
  t.plan(1);

  const log = Logr.createLogger({
    logger,
    reporters: {
      'cli-fancy': {
        reporter: require('../')
      }
    }
  });

  log(['app'], 'some string');
  t.equal(lastMessage, '            \x1b[33mapp\x1b[39m\x1b[90m  ::  \x1b[39msome string');
});

test('string with 2 tags', (t) => {
  t.plan(1);

  const log = Logr.createLogger({
    logger,
    reporters: {
      'cli-fancy': {
        reporter: require('../')
      }
    }
  });

  log(['app', 'debug'], 'some string');
  t.equal(lastMessage, '    \x1b[33mapp\x1b[39m \x1b[90m[\x1b[39m\x1b[2mdebug\x1b[22m\x1b[90m]\x1b[39m\x1b[90m  ::  \x1b[39msome string');
});

test('string with multiple tags', (t) => {
  t.plan(1);

  const log = Logr.createLogger({
    logger,
    reporters: {
      'cli-fancy': {
        reporter: require('../')
      }
    }
  });

  log(['app', 'info', 'test'], 'some string');
  t.equal(lastMessage, '\x1b[33mapp\x1b[39m \x1b[90m[\x1b[39m\x1b[2minfo\x1b[22m,\x1b[2mtest\x1b[22m\x1b[90m]\x1b[39m\x1b[90m  ::  \x1b[39msome string');
});


test('color error, warning, success tags', (t) => {
  t.plan(1);

  const log = Logr.createLogger({
    logger,
    reporters: {
      'cli-fancy': {
        reporter: require('../')
      }
    }
  });

  log(['app', 'error', 'warning', 'success'], 'some string');
  t.equal(lastMessage, '\x1b[33mapp\x1b[39m \x1b[90m[\x1b[39m\x1b[31merror\x1b[39m,\x1b[33mwarning\x1b[39m,\x1b[32msuccess\x1b[39m\x1b[90m]\x1b[39m\x1b[90m  ::  \x1b[39msome string');
});

test('json', (t) => {
  t.plan(1);

  const log = Logr.createLogger({
    logger,
    reporters: {
      'cli-fancy': {
        reporter: require('../')
      }
    }
  });

  log(['app'], {
    message: 'this is some message',
    firstName: 'bob',
    lastName: 'smith',
    age: 100
  });
  t.equal(lastMessage, '            \x1b[33mapp\x1b[39m\x1b[90m  ::  \x1b[39m\n                      \x1b[1mmessage\x1b[22m\x1b[36m: \x1b[39m\x1b[36m"\x1b[39m\x1b[32mthis is some message\x1b[39m\x1b[36m"\x1b[39m\n                    \x1b[1mfirstName\x1b[22m\x1b[36m: \x1b[39m\x1b[36m"\x1b[39m\x1b[32mbob\x1b[39m\x1b[36m"\x1b[39m\n                     \x1b[1mlastName\x1b[22m\x1b[36m: \x1b[39m\x1b[36m"\x1b[39m\x1b[32msmith\x1b[39m\x1b[36m"\x1b[39m\n                          \x1b[1mage\x1b[22m\x1b[36m: \x1b[39m\x1b[33m100\x1b[39m');
});
