const TEMPLATES = {
  ecommerce: {
    label: '🛍️ 電商商品販售版',
    productFields: '商品名稱,商品簡介, 價格, 上下架狀態, 上架時間, 下架時間, 剩餘庫存',
    orderFields: '購買人姓名, 商品名稱, 付款狀態',
    adminNotify: '系統通知：[購買人姓名] 已下單！商品：[商品名稱]，金額：[價格]，剩餘庫存：[剩餘庫存] 件。',
    userNotify: '[購買人姓名] 您好！訂單成功 🎉 商品：[商品名稱]，單號：[單號]。感謝您的購買！'
  },
  booking: {
    label: '📅 課程/活動預約版',
    productFields: '課程名稱,課程介紹, 價格, 上下架狀態, 開課時間, 上架時間, 下架時間, 剩餘名額',
    orderFields: '學員姓名, 課程名稱, 付款狀態',
    adminNotify: '系統通知：[學員姓名] 已預約！課程：[課程名稱]，時段：[預約時段]，剩餘名額：[剩餘名額] 位。',
    userNotify: '[學員姓名] 您好！預約成功 🎉 課程：[課程名稱]，時段：[預約時段]，單號：[單號]。期待與您相見！'
  }
};

const STAGES = [
  {
    id: 'overview', label: '課程總覽', color: 's1',
    title: 'Vibe Coding 手把手實戰班',
    desc: '用 LINE OA 打造你的第一套銷售/預約系統 MVP — 6 小時完成從零到上線',
    steps: [
      {
        title: '🌟 什麼是 Vibe Coding？',
        body: '在開始動手之前，先搞懂今天我們到底在做什麼。',
        vibeCodingIntro: true
      },
      {
        title: '課程目標',
        body: '學員在 6 小時內完成一套可運作的 LINE OA 銷售/預約系統 MVP。<br>真正想教的能力：如何把商業需求拆解成系統需求，並透過 AI 完成系統建置。',
        image: 'line流程圖.png',
        checklist: ['LINE OA 串接', '商品管理', '訂單管理', 'LINE Webhook', 'Cloudflare Worker', 'D1 Database', 'Rich Menu', 'LINE 通知', 'MVP 上線']
      },
      {
        title: '適合對象',
        body: '已有 LINE OA 經營需求的工作者',
        checklist: ['美甲師 / 顧問 / 教練', '講師 / 塔羅老師', '接案工作者 / 實體商品電商'],
        extra: '必須符合：願意自己動手做、願意使用 AI、系統建置在 LINE OA 上'
      },
      {
        title: '📋 課前準備（防呆清單）',
        body: '請在課程開始前確認以下設備與帳號都已備妥，尤其是 Gmail 帳號，少了它會卡在第一關！',
        checklist: [
          '✅ 攜帶筆電與充電線',
          '✅ 確認自己有 Gmail 帳號，且能正常登入（Cloudflare 必須用 Gmail 快速登入）',
          '✅ AI 工具帳號已登入（Claude / Codex / Antigravity 等，付費版）',
          '✅ 手機已安裝並登入 LINE'
        ],
        extra: '⚠️ 若您忘記 Gmail 密碼，請務必在課前解決，否則無法完成 Cloudflare 帳號申請。'
      },
      {
        title: '📖 專有名詞白話對照表',
        body: '這些術語在今天課程中會頻繁出現。遇到不懂的，回來查這張表就對了！',
        glossary: true
      },
      {
        title: '🛠️ Vibe Coding 除錯 SOP',
        body: '每個人的電腦環境不同，遇到報錯是正常的。重點是你知道怎麼處理！',
        debugSop: true
      },
      {
        title: '技術架構總覽',
        body: '整個系統的資料流如下：',
        image: '02_技術架構總覽.png',
        flow: ['使用者手機<br />Rich Menu', 'LINE 平台', 'Webhook (事件傳入)', 'Cloudflare Worker<br/>D1 Database', 'Messaging API (回覆傳出)', '使用者手機'],
        techs: ['LINE OA', 'Cloudflare Worker', 'D1 Database', 'Webhook', 'Rich Menu']
      }
    ]
  },
  {
    id: 'morning1', label: 'Ch1-2 成果與生態', color: 's1',
    title: '上午前半：成果展示與 LINE 生態系統',
    desc: '了解今天要完成什麼，以及 LINE 開發者生態系統的核心概念',
    steps: [
      {
        title: 'Ch1 - 課程成果展示',
        body: '講師展示今天課程結束後學員將完成的 MVP 系統，包含完整的銷售/預約流程。',
        checklist: ['了解 MVP 最終樣貌', '理解 MVP 範圍（包含與不包含）']
      },
      {
        title: 'MVP 範圍確認',
        body: '明確界定本次課程的實作範圍',
        checklist: [
          '✅ 包含：商品管理、商品上下架、庫存/名額',
          '✅ 包含：訂單管理、Webhook、Rich Menu',
          '✅ 包含：LINE 通知、Cloudflare 部署',
          '❌ 不包含：金流、CRM、會員系統',
          '❌ 不包含：Google Calendar、自動排課、LIFF、多角色權限'
        ]
      },
      {
        title: 'Ch2 - LINE 生態系統建置',
        image: '01_LINE三把鑰匙.png',
        body: '依照以下步驟完成 LINE 官方帳號與開發者後台設定，並填寫下方憑證資訊。<br><br>' +
          '<div class="antifraud-notice">📣 <strong>防呆提示</strong>：進行到每個步驟時，講師或小幫手會同步將直達連結發送到 LINE 群組。請用 Chrome 開啟，避免使用 LINE 內建瀏覽器（可能有權限問題）。</div><br>' +
          '<strong>Step 1：建立 LINE 官方帳號 (LINE OA)</strong><br>' +
          '網址：<a href="https://manager.line.biz/" target="_blank" class="ext-link-btn">🔗 開啟 LINE Official Account Manager</a><br>' +
          '建立未來用來與客戶互動的官方帳號。<br><br>' +
          '<strong>Step 2：進入 LINE Developers</strong><br>' +
          '網址：<a href="https://developers.line.biz/" target="_blank" class="ext-link-btn">🔗 開啟 LINE Developers 後台</a><br>' +
          '登入 LINE Developers 後台。<br><br>' +
          '<strong>Step 3：建立 Provider</strong><br>' +
          '路徑：Console &rarr; Create a Provider，建立專案所屬容器。<br><br>' +
          '<strong>Step 4：建立 Messaging API Channel</strong><br>' +
          '路徑：Provider &rarr; Create a Channel &rarr; Messaging API。<br><br>' +
          '<strong>Step 5：取得開發憑證</strong><br>' +
          '- <strong>Channel Secret</strong>：Basic Settings &rarr; Channel Secret（用途：驗證 Webhook 來源與訊息安全）<br>' +
          '- <strong>Channel Access Token</strong>：Messaging API &rarr; Issue（用途：主動發送通知與回覆訊息）',
        checklist: [
          'LINE OA 已建立',
          'LINE Developers 已登入',
          'Provider 已建立',
          'Messaging API Channel 已建立',
          '已取得 Channel Secret',
          '已取得 Channel Access Token'
        ],
        result: '成果：取得 Access Token 和 Channel Secret',
        tip: '💡 <strong>為什麼要拿這兩把「鑰匙」？</strong><br>把 LINE OA 想像成你家大門。Channel Secret 是「門禁卡驗證碼」（確認訊息真的來自 LINE，不是假冒的）；Access Token 是「萬能遙控器」（讓你的系統可以主動幫你發訊息給客人）。等等我們要把這兩把鑰匙交給 AI，讓 AI 幫你打造整套門禁系統。',
        worksheet: {
          title: 'LINE 帳號資訊記錄 (填寫後可在下方直接複製)',
          hasCopyOutput: true,
          copyTargetId: 'line_credentials_copy',
          fields: [
            { id: 'line_channel_id', label: 'Channel ID (必填)', type: 'text', hint: '在 LINE Developers 的 Basic settings 中取得' },
            { id: 'line_channel_secret', label: 'Channel Secret (必填)', type: 'text', hint: '在 LINE Developers 的 Basic settings 中取得' },
            { id: 'line_access_token', label: 'Access Token (必填)', type: 'textarea', hint: '在 Messaging API tab 最下方 Issue 取得的長效 Token' }
          ]
        }
      }
    ]
  },
  {
    id: 'morning2', label: 'Ch3-5 資料流與設定', color: 's2',
    title: '上午後半：資料流、環境建置與系統設定',
    desc: '理解 LINE 訊息如何流動，並完成 Cloudflare 環境建置與系統規格定義',
    steps: [
      {
        title: 'Ch3 - LINE 資料流',
        image: '02_技術架構總覽.png',
        body: '理解使用者從 LINE 發送訊息到系統回應的完整資料流（形成雙向閉環）',
        flow: ['使用者傳送', 'LINE 平台接收', 'Webhook 轉發', 'Cloudflare Worker', 'D1 Database 存取', 'Messaging API 回覆', 'LINE 平台傳送', '使用者接收'],
        tip: '💡 <strong>白話比喻</strong>：整個流程就像你在便當店點餐。客人在點了便當（使用者 ➔ LINE OA），櫃台把訂單透過門鈴通知廚房（Webhook ➔ Cloudflare），廚房去倉庫拿貨並更新庫存（Cloudflare ➔ Database），最後出單告訴客人「好了！」（通知）。'
      },
      {
        title: 'Ch4 - Cloudflare 環境建置',
        body: '建立雲端伺服器環境（免費！）<br><br>' +
          '<div class="antifraud-notice">📣 <strong>防呆提示</strong>：講師會同步把 Cloudflare 連結發到 LINE 群組，請點擊連結直接開啟，用 <strong>Gmail 帳號</strong>快速登入。若沒有 Gmail 請舉手告知。</div><br>' +
          '網址：<a href="https://dash.cloudflare.com/sign-up" target="_blank" class="ext-link-btn">🔗 開啟 Cloudflare 註冊頁面</a>',
        checklist: ['使用 Gmail 快速登入 Cloudflare 帳號（預計時間：5 分鐘）'],
        extra: '⏱️ 預估此步驟實作與排障時間：10 - 15 分鐘'
      },
      {
        title: 'Ch5 - 建立系統欄位規格',
        body: '定義你的商品表與訂單表的欄位結構。這個步驟超重要！AI 等等要根據這份規格來幫你蓋系統。<br><br>👇 <strong>請先選擇符合你產業的範本，再微調</strong>：',
        templateSelector: true,
        worksheet: {
          title: '📋 資料表規格與通知範本定義',
          fields: [
            { id: 'product_fields', label: '商品表欄位（請以逗號分隔）', type: 'text', hint: '選擇上方範本後會自動填入，可再自行修改' },
            { id: 'order_fields', label: '訂單表欄位（請以逗號分隔）', type: 'text', hint: '選擇上方範本後會自動填入，可再自行修改' },
            { id: 'admin_notify_tpl', label: '管理員通知內容範本', type: 'textarea', hint: '選擇範本後自動填入。用 [欄位名] 作為動態替換變數' },
            { id: 'user_notify_tpl', label: '客戶通知內容範本', type: 'textarea', hint: '選擇範本後自動填入。用 [欄位名] 作為動態替換變數' }
          ]
        },
        tip: '💡 <strong>為什麼要定義這些欄位？</strong><br>把這個步驟想成「跟 AI 說你要開什麼類型的店、要記錄哪些客人資料」。你描述得越清楚，AI 建出來的系統就越貼近你的需求。等等我們會把這份規格跟 LINE 憑證一起「打包」交給 AI。'
      }
    ]
  },
  {
    id: 'afternoon1', label: 'Step 1-4 建置核心', color: 's3',
    title: '下午實作前段：整合提示詞與核心系統',
    desc: '使用彙整後的提示詞引導 AI 建立商品與訂單核心系統',
    steps: [
      {
        title: 'Step 1 - 匯整系統提示詞',
        body: '整合前面步驟填寫的 LINE 憑證與欄位規格設定，自動彙整為一頁完整的 AI 指引 Prompt。您將使用此 Prompt 搭配 Cloudflare Skill 引導 AI 進行開發。',
        promptBox: {
          id: 'system_prompt_output',
          buttonText: '複製 AI 開發提示詞'
        },
        tip: '💡 <strong>這個步驟在做什麼？</strong><br>就是把前面填好的「鑰匙（LINE 憑證）」和「店面規格（商品/訂單欄位）」打包成一份清單，交給 AI。AI 收到這份清單，就知道要幫你建什麼樣的系統了。這就是 Vibe Coding 的核心：<strong>你負責告訴 AI 要做什麼、驗收結果；AI 負責寫程式、建資料庫。</strong>'
      },
      {
        title: 'Step 2 - 建立商品與訂單管理系統',
        body: '使用 AI 協作完成商品管理與訂單的核心功能，包含新增、修改、上下架與狀態異動。',
        checklist: [
          '商品新增與修改功能',
          '商品上下架狀態切換',
          '訂單建立與查詢功能',
          '訂單狀態修改（確認/取消）'
        ],
        extra: '⏱️ 預估此步驟實作與排障時間：30 - 45 分鐘'
      },
      {
        title: 'Step 3 - 本地資料庫連接與測試',
        body: '在本地環境模擬連接 D1 資料庫，確認商品與訂單的核心功能完全正常。',
        checklist: [
          '執行 wrangler d1 execute ... 初始化（cd = 進入資料夾，就像滑鼠點兩下）',
          '啟動本地開發伺服器 npm run dev（等於在自己電腦開一個暫時的測試網頁）',
          '確認本地 CRUD 測試通過'
        ],
        extra: '⏱️ 預估此步驟實作與排障時間：20 - 30 分鐘'
      },
      {
        title: '🗣️ AI 溝通心法與語音輸入',
        body: '遇到卡關或想要改功能，如何最有效率地跟 AI 溝通？',
        aiTips: true
      }
    ]
  },
  {
    id: 'afternoon2', label: 'Step 5-10 部署上線', color: 's4',
    title: '下午實作後段：資料庫、部署與串接',
    desc: '連接 D1 Database、部署到 Cloudflare、串接 LINE Webhook，完成 Rich Menu 與預約流程',
    steps: [
      {
        title: 'Step 5 - 建立 Cloudflare D1',
        body: '在 Cloudflare 上建立 D1 資料庫（超級 Excel，用來存商品和訂單）',
        checklist: ['建立 D1 Database', '取得 Database ID', '設定 wrangler.toml 綁定'],
        extra: '⏱️ 預估此步驟實作與排障時間：15 - 25 分鐘',
        worksheet: {
          title: 'D1 資料庫資訊',
          fields: [
            { id: 'cloudflare_db_name', label: 'Database 名稱', type: 'text', hint: '例如：vibe-booking-db' },
            { id: 'cloudflare_db_id', label: 'Database ID', type: 'text', hint: '建立後取得的 UUID' }
          ]
        }
      },
      {
        title: 'Step 6 - 接上 D1 Database',
        body: '將本地測試通過的系統連接到雲端 D1 資料庫',
        checklist: [
          '修改程式碼連接 D1',
          '確認資料可正常寫入',
          '確認資料可正常讀取'
        ]
      },
      {
        title: 'Step 7 - 部署到 Cloudflare Worker',
        body: '將系統部署到雲端，取得正式的 Worker URL（部署 = 把程式打包上傳到雲端，讓全世界都能透過網址連進來）',
        checklist: ['執行 wrangler deploy', '確認部署成功', '記錄 Worker URL'],
        result: '成果：取得 Worker URL',
        extra: '⏱️ 預估此步驟實作與排障時間：15 - 20 分鐘',
        worksheet: {
          title: '部署資訊記錄',
          fields: [
            { id: 'cloudflare_worker_url', label: 'Worker URL', type: 'text', hint: '例如：https://my-booking.xxx.workers.dev' }
          ]
        }
      },
      {
        title: 'Step 8 - LINE Webhook 串接',
        body: '將 LINE OA 與你的 Worker 系統連接起來（Webhook = 門鈴。客人在 LINE 敲你，LINE 就去按 Cloudflare 的門鈴）',
        checklist: [
          '設定 Webhook URL',
          '回填 Access Token',
          '回填 Channel Secret',
          'Webhook 驗證通過'
        ]
      },
      {
        title: 'Step 9 - 建立 Rich Menu',
        body: '設計並建立 LINE 官方帳號的圖文選單。請複製下方的 AI 產圖提示詞，至 Midjourney / DALL-E 等生圖工具產生選單底圖，隨後上傳至 LINE OA。',
        promptBox: {
          id: 'rich_menu_image_prompt',
          buttonText: '複製選單產圖提示詞'
        }
      },
      {
        title: 'Step 10 - 預約流程打通',
        body: '完成端到端的流程測試',
        flow: ['手機點選商品', '系統回傳列表', '送出預約資料', '系統寫入 D1', '發送管理員通知', '發送客戶通知'],
        result: '銷售/預約流程完整打通 🎉'
      }
    ]
  },
  {
    id: 'verify', label: '驗收', color: 's5',
    title: '驗收標準與完成確認',
    desc: '逐一確認所有功能是否正常運作，確保帶走一個可運作的 MVP',
    steps: [
      {
        title: '功能驗收清單',
        body: '請逐一測試以下功能並打勾確認',
        checklist: [
          '商品新增成功',
          '商品顯示成功',
          '訂單建立成功',
          'Webhook 正常運作',
          'Rich Menu 正常顯示',
          '管理員收到通知',
          '客戶收到通知'
        ],
        result: '全部通過 = MVP 完成 🚀'
      },
      {
        title: '備援方案',
        body: '若學員實作遇到困難，講師提供 Demo 專案作為備援，確保學員至少能部署成功並帶作品回家。',
        checklist: [
          '取得講師 Demo 專案',
          '部署 Demo 專案到自己的 Cloudflare',
          '串接自己的 LINE OA'
        ],
        result: '確保每位學員都能帶走可運作的系統'
      },
      {
        title: '🚀 MVP 之後，然後呢？',
        body: '完成了 MVP 只是開始，這套 Vibe Coding 技能是可以無限延伸的！',
        futureExpansion: true,
        checklist: [
          '加入學員交流群組',
          '取得課程教材與文件',
          '了解進階功能擴充方向'
        ]
      }
    ]
  }
];
