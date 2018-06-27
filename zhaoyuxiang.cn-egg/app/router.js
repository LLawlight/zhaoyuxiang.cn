module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.resources('topics', '/api/v2/topics', 'topics');
}