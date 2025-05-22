
const routes = [

  {
    path: '/',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Index.vue') },
      { path: 'idn', component: () => import('src/pages/IndexIdn.vue') },
      { path: 'kor', component: () => import('src/pages/IndexKor.vue') },
      { path: 'airdrop', component: () => import('src/pages/Index_airdrop.vue') },
    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/admin/AdminHome.vue') },
      { path: 'adminMenu', component: () => import('pages/admin/AdminMenu.vue') },
      { path: 'adminUserList', component: () => import('pages/admin/AdminUserList.vue') },
      { path: 'registerProject', component: () => import('pages/admin/AdminRegisterProject.vue') },
      { path: 'createCollection', component: () => import('pages/admin/AdminCreateCollection.vue') },
      { path: 'adminAirdrop', component: () => import('pages/admin/AdminAirdrop.vue') },
    ]
  },
  {
    path: '/total',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/admin/AdminAirdropTotalList.vue') },
    ]
  },
  {
    path: '/snapshot',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/snapshot/SnapshotMain.vue') },
      { path: 'solana', component: () => import('pages/snapshot/SnapshotSolana.vue') },
    ]
  },
  {
    path: '/beastar1',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/beastar1/MintBeastar1.vue') },
    ]
  },
  {
    path: '/beastar2',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/beastar2/MintBeastar2.vue') },
    ]
  },
  {
    path: '/mypage',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/mypage/MyPage.vue') },
      { path: 'kor', component: () => import('pages/mypage/MyPageKor.vue') },
      { path: 'idn', component: () => import('pages/mypage/MyPageIdn.vue') },
    ]
  },
  {
    path: '/project',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: 'projectList', component: () => import('pages/project/ProjectList.vue')},
      { path: 'projectRegister', component: () => import('pages/project/ProjectRegister.vue') },
      { path: 'projectDetail', component: () => import('pages/project/ProjectDetail.vue') },
      { path: 'projectModify', component: () => import('pages/project/ProjectModify.vue') },
    ]
  },
  {
    path: '/airdrop',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/airdrop/Airdrop.vue') },
    ]
  },
  {
    path: '/batchMinting',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/batch/BatchMinting_async.vue') },
    ]
  },
  {
    path: '/mint',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/batch/BatchMinting_async.vue') },
    ]
  },
  {
    path: '/test',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', component: () => import('pages/test/Test.vue')},
      {path: 'testBubble', component: () => import('src/pages/test/TestBubblejum.vue')},
      {path: 'testKeyValueMerge', component: () => import('pages/test/TestKeyValueMerge.vue')},
      {path: 'testPayment', component: () => import('pages/test/TestPayment.vue')},
      {path: 'testWalletSign', component: () => import('src/pages/test/TestWalletSign.vue')},
      {path: 'testConnectList', component: () => import('src/pages/test/TestConnectList.vue')},
      {path: 'testFetchCNFT', component: () => import('src/pages/test/TestFetchCNFT.vue')},
    ]
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    // component: () => import('layouts/MainLayout.vue'),
    component: () => import('pages/Error404.vue'),
    // children: [
    //   { path: '', component: () => import('pages/Error404.vue') },
    // ]
  }
]

export default routes
