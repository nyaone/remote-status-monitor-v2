import { MaintenanceConfig, PageConfig, WorkerConfig } from './types/config'

const pageConfig: PageConfig = {
  // Title for your status page
  title: "喵窝·服务状态",
  // Links shown at the header of your status page, could set `highlight` to `true`
  links: [
    { link: 'https://docs.nya.one/', label: '资料室' },
    { link: 'https://nya.one/', label: '喵窝', highlight: true },
  ],
  // [OPTIONAL] Group your monitors
  // If not specified, all monitors will be shown in a single list
  // If specified, monitors will be grouped and ordered, not-listed monitors will be invisble (but still monitored)
  group: {
    '💓 核心系统': ['misskey', 'object_storage', 'media_proxy'],
    '✨ 周边生态': ['relay', 'matrix', 'mail_system'],
    '🛠️ 辅助功能': ['api_wrap', 'backup_domain'],
    '🧪 开发环境': ['dev_misskey', 'dev_matrix', 'dev_api_wrap'],
  },
}

const workerConfig: WorkerConfig = {
  // Write KV at most every 3 minutes unless the status changed
  kvWriteCooldownMinutes: 3,
  // Enable HTTP Basic auth for status page & API by uncommenting the line below, format `<USERNAME>:<PASSWORD>`
  // passwordProtection: 'username:password',
  // Define all your monitors here
  monitors: [
    // // Example HTTP Monitor
    // {
    //   // `id` should be unique, history will be kept if the `id` remains constant
    //   id: 'foo_monitor',
    //   // `name` is used at status page and callback message
    //   name: 'My API Monitor',
    //   // `method` should be a valid HTTP Method
    //   method: 'POST',
    //   // `target` is a valid URL
    //   target: 'https://example.com',
    //   // [OPTIONAL] `tooltip` is ONLY used at status page to show a tooltip
    //   tooltip: 'This is a tooltip for this monitor',
    //   // [OPTIONAL] `statusPageLink` is ONLY used for clickable link at status page
    //   statusPageLink: 'https://example.com',
    //   // [OPTIONAL] `hideLatencyChart` will hide status page latency chart if set to true
    //   hideLatencyChart: false,
    //   // [OPTIONAL] `expectedCodes` is an array of acceptable HTTP response codes, if not specified, default to 2xx
    //   expectedCodes: [200],
    //   // [OPTIONAL] `timeout` in millisecond, if not specified, default to 10000
    //   timeout: 10000,
    //   // [OPTIONAL] headers to be sent
    //   headers: {
    //     'User-Agent': 'Uptimeflare',
    //     Authorization: 'Bearer YOUR_TOKEN_HERE',
    //   },
    //   // [OPTIONAL] body to be sent
    //   body: 'Hello, world!',
    //   // [OPTIONAL] if specified, the response must contains the keyword to be considered as operational.
    //   responseKeyword: 'success',
    //   // [OPTIONAL] if specified, the response must NOT contains the keyword to be considered as operational.
    //   responseForbiddenKeyword: 'bad gateway',
    //   // [OPTIONAL] if specified, will call the check proxy to check the monitor, mainly for geo-specific checks
    //   // refer to docs https://github.com/lyc8503/UptimeFlare/wiki/Check-proxy-setup before setting this value
    //   // currently supports `worker://` and `http(s)://` proxies
    //   checkProxy: 'https://xxx.example.com OR worker://weur',
    //   // [OPTIONAL] if true, the check will fallback to local if the specified proxy is down
    //   checkProxyFallback: true,
    // },
    // // Example TCP Monitor
    // {
    //   id: 'test_tcp_monitor',
    //   name: 'Example TCP Monitor',
    //   // `method` should be `TCP_PING` for tcp monitors
    //   method: 'TCP_PING',
    //   // `target` should be `host:port` for tcp monitors
    //   target: '1.2.3.4:22',
    //   tooltip: 'My production server SSH',
    //   statusPageLink: 'https://example.com',
    //   timeout: 5000,
    // },
    {
      id: 'misskey',
      name: 'Misskey',
      method: 'POST',
      target: 'https://nya.one/api/meta',
      tooltip: '喵窝的主站服务',
      statusPageLink: 'https://nya.one',
      hideLatencyChart: false,
      expectedCodes: [200],
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
      body: '{ "detail": false }',
    },
    {
      id: 'object_storage',
      name: '对象存储',
      method: 'GET',
      target: 'https://sh.nfs.pub/nyaone/ff02042e-524e-48e8-bb27-17621d96b13a.png',
      tooltip: '喵窝的对象（文件）存储服务',
      hideLatencyChart: false,
      expectedCodes: [200],
      timeout: 10000,
    },
    {
      id: 'media_proxy',
      name: '媒体代理',
      method: 'GET',
      target: 'https://o.n1mp.org',
      tooltip: '喵窝的媒体文件代理服务',
      hideLatencyChart: false,
      expectedCodes: [400],
      timeout: 10000,
    },
    {
      id: 'relay',
      name: '喵家中继',
      method: 'GET',
      target: 'https://relay.nya.one/actor',
      tooltip: '一个 Fediverse 中继站',
      statusPageLink: 'https://relay.nya.one/',
      hideLatencyChart: false,
      expectedCodes: [200],
      timeout: 10000,
    },
    {
      id: 'matrix',
      name: 'Matrix',
      method: 'GET',
      target: 'https://matrix.nya.one/_matrix/client/versions',
      tooltip: '喵窝的即时通讯服务',
      statusPageLink: 'https://docs.nya.one/peripheral/matrix/',
      hideLatencyChart: false,
      expectedCodes: [200],
      timeout: 10000,
    },
    {
      id: 'mail_system',
      name: '邮件系统',
      method: 'TCP_PING',
      target: 'mx.nya.one:465',
      tooltip: '喵窝的邮件处理系统',
      statusPageLink: 'https://docs.nya.one/peripheral/email/use/',
      timeout: 5000,
    },
    {
      id: 'api_wrap',
      name: 'API Wrap',
      method: 'GET',
      target: 'https://api.nya.one',
      tooltip: '喵窝的 API 封装',
      hideLatencyChart: false,
      expectedCodes: [200],
      timeout: 10000,
    },
    {
      id: 'backup_domain',
      name: '备用域名',
      method: 'GET',
      target: 'https://n1.homes',
      tooltip: '喵窝的防污染备用访问入口',
      statusPageLink: 'https://n1.homes',
      hideLatencyChart: false,
      expectedCodes: [200],
      timeout: 10000,
    },
    {
      id: 'dev_misskey',
      name: 'Misskey (DEV)',
      method: 'POST',
      target: 'https://dev.nya.one/api/meta',
      tooltip: '喵窝的主站服务（开发环境）',
      statusPageLink: 'https://dev.nya.one',
      hideLatencyChart: false,
      expectedCodes: [200],
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
      body: '{ "detail": false }',
    },
    {
      id: 'dev_api_wrap',
      name: 'API Wrap (DEV)',
      method: 'GET',
      target: 'https://dev-api.nya.one',
      tooltip: '喵窝的 API 封装（开发环境）',
      hideLatencyChart: false,
      expectedCodes: [200],
      timeout: 10000,
    },
  ],
  notification: {
    // [Optional] apprise API server URL
    // if not specified, no notification will be sent
    // appriseApiServer: 'https://apprise.example.com/notify',
    // // [Optional] recipient URL for apprise, refer to https://github.com/caronc/apprise
    // // if not specified, no notification will be sent
    // recipientUrl: 'tgram://bottoken/ChatID',
    // // [Optional] timezone used in notification messages, default to "Etc/GMT"
    // timeZone: 'Asia/Shanghai',
    // // [Optional] grace period in minutes before sending a notification
    // // notification will be sent only if the monitor is down for N continuous checks after the initial failure
    // // if not specified, notification will be sent immediately
    // gracePeriod: 5,
    // // [Optional] disable notification for monitors with specified ids
    // skipNotificationIds: ['foo_monitor', 'bar_monitor'],
  },
  callbacks: {
    onStatusChange: async (
      env: any,
      monitor: any,
      isUp: boolean,
      timeIncidentStart: number,
      timeNow: number,
      reason: string
    ) => {
      // This callback will be called when there's a status change for any monitor
      // Write any Typescript code here
      // This will not follow the grace period settings and will be called immediately when the status changes
      // You need to handle the grace period manually if you want to implement it
    },
    onIncident: async (
      env: any,
      monitor: any,
      timeIncidentStart: number,
      timeNow: number,
      reason: string
    ) => {
      // This callback will be called EVERY 1 MINTUE if there's an on-going incident for any monitor
      // Write any Typescript code here
    },
  },
}

// You can define multiple maintenances here
// During maintenance, an alert will be shown at status page
// Also, related downtime notifications will be skipped (if any)
// Of course, you can leave it empty if you don't need this feature
// const maintenances: MaintenanceConfig[] = []
const maintenances: MaintenanceConfig[] = [
  // {
  //   // [Optional] Monitor IDs to be affected by this maintenance
  //   monitors: ['foo_monitor', 'bar_monitor'],
  //   // [Optional] default to "Scheduled Maintenance" if not specified
  //   title: 'Test Maintenance',
  //   // Description of the maintenance, will be shown at status page
  //   body: 'This is a test maintenance, server software upgrade',
  //   // Start time of the maintenance, in UNIX timestamp or ISO 8601 format
  //   start: '2025-04-27T00:00:00+08:00',
  //   // [Optional] end time of the maintenance, in UNIX timestamp or ISO 8601 format
  //   // if not specified, the maintenance will be considered as on-going
  //   end: '2025-04-30T00:00:00+08:00',
  //   // [Optional] color of the maintenance alert at status page, default to "yellow"
  //   color: 'blue',
  // },
]

// Don't forget this, otherwise compilation fails.
export { pageConfig, workerConfig, maintenances }
