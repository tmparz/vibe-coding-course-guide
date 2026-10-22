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
    adminNotify: '系統通知：[學員姓名] 已預約！課程：[課程名稱]，開課時間：[開課時間]，剩餘名額：[剩餘名額] 位。',
    userNotify: '[學員姓名] 您好！預約成功 🎉 課程：[課程名稱]，開課時間：[開課時間]，單號：[單號]。期待與您相見！'
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
        title: '🗓️ 今日排程（第二天）',
        body: '第一天已經上過 LINE 生態系統、資料流和 Cloudflare，所以今天直接從系統規格開始，多出來的時間留給實作和排障。' +
          '<div class="glossary-table"><table><thead><tr><th>時間</th><th>內容</th><th>對應步驟</th></tr></thead><tbody>' +
          '<tr><td>00:00–00:20</td><td>複習：第一天的 FAQ 機器人還能用嗎</td><td>Ch1-2</td></tr>' +
          '<tr><td>00:20–00:35</td><td>MVP 範圍確認</td><td>Ch1</td></tr>' +
          '<tr><td>00:35–01:05</td><td>建立系統欄位規格</td><td>Ch5</td></tr>' +
          '<tr><td>01:05–02:35</td><td>整合提示詞、建立系統、本地測試</td><td>Step 1–3</td></tr>' +
          '<tr><td>02:35–03:15</td><td>建立並接上 D1</td><td>Step 5–6</td></tr>' +
          '<tr><td>03:15–03:45</td><td>部署、串接 Webhook（第一天做過）</td><td>Step 7–8</td></tr>' +
          '<tr><td>03:45–04:30</td><td>用 AI 產生選單圖，在 OA 後台建立圖文選單</td><td>Step 9</td></tr>' +
          '<tr><td>04:30–05:20</td><td>預約流程打通、驗收</td><td>Step 10、驗收</td></tr>' +
          '<tr><td>05:20–06:00</td><td>換一把新鑰匙、緩衝</td><td>驗收</td></tr>' +
          '</tbody></table></div>',
        extra: '午休與短休息另計，放在單元交界處。'
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
          '✅ ChatGPT Plus 仍在訂閱中，Codex 可以正常登入',
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
        title: '複習：第一天的 FAQ 機器人還能用嗎？',
        body: '用手機問你的官方帳號一題 FAQ，確認昨天的機器人還在運作。<br><br>' +
          '昨天最後看到的問題：<strong>真人在聊天室回覆時，機器人也跟著回</strong>，因為它沒有記憶。今天的系統會加上資料庫和後台，讓它記得每位客人的狀態。',
        checklist: ['手機問一題 FAQ，機器人有回答', '說得出昨天「真人和機器人同時回覆」的原因']
      },
      {
        title: 'Ch1 - 課程成果展示',
        body: '第一天開場已經看過成品。這裡再看一次今天要完成的 MVP 系統，包含完整的銷售/預約流程。',
        checklist: ['了解 MVP 最終樣貌', '理解 MVP 範圍（包含與不包含）']
      },
      {
        title: 'MVP 範圍確認',
        body: '明確界定本次課程的實作範圍',
        checklist: [
          '✅ 包含：商品管理、商品上下架、庫存/名額',
          '✅ 包含：按下訂購鍵在對話框產生文字訊息（觸發寫入 LINE 官方帳號 Chat 聊天紀錄）',
          '✅ 包含：訂單管理、Webhook、Rich Menu',
          '✅ 包含：LINE 雙向即時通知（顧客確認＋管理員推播）、Cloudflare 部署',
          '✅ 包含：保留第一天的 AI FAQ、真人接手模式、記錄 AI 答不出來的問題',
          '❌ 不包含：金流、CRM、會員系統',
          '❌ 不包含：Google Calendar、自動排課、LIFF、多角色權限'
        ]
      },
      {
        title: 'Ch2 - LINE 生態系統建置',
        image: '01_LINE三把鑰匙.png',
        body: '<div class="antifraud-notice">✅ <strong>第一天已完成這一步</strong>：用同一台電腦開啟本頁，下方欄位會自動帶入第一天填的資料。換電腦的同學，請依步驟重新取得並填寫。</div><br>' +
          '依照以下步驟完成 LINE 官方帳號與開發者後台設定，並填寫下方憑證資訊。<br><br>' +
          '<div class="antifraud-notice">📣 <strong>防呆提示</strong>：進行到每個步驟時，講師或小幫手會同步將直達連結發送到 LINE 群組。請用 Chrome 開啟，避免使用 LINE 內建瀏覽器（可能有權限問題）。</div><br>' +
          '<strong>Step 1：建立 LINE 官方帳號 (LINE OA)</strong><br>' +
          '網址：<a href="https://manager.line.biz/" target="_blank" class="ext-link-btn">🔗 開啟 LINE Official Account Manager</a><br>' +
          '建立未來用來與客戶互動的官方帳號。<br><br>' +
          '<strong>Step 2：進入 LINE Developers</strong><br>' +
          '網址：<a href="https://developers.line.biz/" target="_blank" class="ext-link-btn">🔗 開啟 LINE Developers 後台</a><br>' +
          '登入 LINE Developers 後台。<br><br>' +
          '<strong>Step 3：從 OA Manager 啟用 Messaging API</strong><br>' +
          '路徑：LINE Official Account Manager &rarr; 設定 &rarr; Messaging API &rarr; 啟用（第一次會請你建立 Provider，取一個名字就好）。再到 LINE Developers 找對應的 Channel。<br><br>' +
          '<strong>Step 4：取得開發憑證與管理員 UID</strong><br>' +
          '- <strong>Channel Secret</strong>：Basic Settings &rarr; Channel Secret（用途：驗證 Webhook 來源與訊息安全）<br>' +
          '- <strong>Channel Access Token</strong>：Messaging API &rarr; Issue（用途：主動發送通知與回覆訊息）<br>' +
          '- <strong>Your user ID (管理員 LINE UID)</strong>：Basic Settings 頁面最下方 &rarr; Your user ID（用途：當有客戶下單時，系統推播訂單通知給哪一位管理員，格式為 U 開頭的 33 碼英數）',
        checklist: [
          'LINE OA 已建立',
          'LINE Developers 已登入',
          'Provider 已建立',
          'Messaging API Channel 已建立',
          '已取得 Channel Secret',
          '已取得 Channel Access Token',
          '已取得管理員 LINE UID (Your user ID)'
        ],
        result: '成果：取得 Channel ID、Channel Secret、Access Token 與管理員 LINE UID',
        tip: '💡 <strong>為什麼要拿這三把「鑰匙」？</strong><br>把 LINE OA 想像成你的自動化店面：<br>1. <strong>Channel Secret</strong> 是「門禁密碼」（確認訊息真的來自 LINE，不是假冒攻擊）<br>2. <strong>Access Token</strong> 是「萬能發話遙控器」（讓 Worker 系統可以主動發訊息給客人）<br>3. <strong>Your user ID</strong> 是「老闆專屬信箱」（有客人下單時，系統推播通知給哪一位管理員）<br>等等我們把這三把鑰匙交給 AI，整套自動化銷售與推播系統就能完美運作！',
        worksheet: {
          title: 'LINE 帳號資訊記錄 (填寫後可在下方直接複製)',
          hasCopyOutput: true,
          copyTargetId: 'line_credentials_copy',
          fields: [
            { id: 'line_channel_id', label: 'Channel ID (必填)', type: 'text', hint: '在 LINE Developers 的 Basic settings 中取得' },
            { id: 'line_channel_secret', label: 'Channel Secret (必填)', type: 'text', hint: '在 LINE Developers 的 Basic settings 中取得' },
            { id: 'line_admin_uid', label: '管理員 LINE UID (必填)', type: 'text', hint: '在 Basic settings 最下方「Your user ID」取得（格式為 U 開頭的 33 碼英數，非個人 LINE ID）' },
            { id: 'line_access_token', label: 'Access Token (必填)', type: 'textarea', hint: '在 Messaging API tab 最下方 Issue 取得的長效 Token' }
          ]
        }
      },
      {
        title: '第一天的 FAQ 與 Gemini 鑰匙',
        body: '今天的系統會<strong>保留第一天的 AI FAQ</strong>：客人一般的問題，照樣由 Gemini 根據你的 FAQ 回答。同一台電腦會自動帶入，換電腦的同學請到第一天頁面的「我的 FAQ」分頁複製，或重新貼上。',
        worksheet: {
          title: '第一天資料（同一台電腦會自動帶入）',
          fields: [
            { id: 'gemini_api_key', label: 'Gemini API Key', type: 'text', hint: '第一天在 Google AI Studio 建立的金鑰' },
            { id: 'my_faq', label: '我的 FAQ', type: 'textarea', hint: '第一天確認好的 FAQ' }
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
        body: '第一天已經學過訊息怎麼走。今天的系統多了資料庫，訊息進來後要先<strong>分流</strong>：按鈕送出的指令走預約，客人自己打的字走 AI FAQ。',
        flow: ['使用者傳送/點擊選單', '對話框產生訂購文字', 'LINE 平台轉發 Webhook', 'Cloudflare Worker 處理', 'D1 資料庫扣庫存', 'Messaging API 雙向推播', 'LINE 官方後台記錄 Chat', '使用者與管理者接收'],
        tip: '💡 <strong>關鍵細節：為什麼按下訂購鍵時，對話框一定要產生文字？</strong><br>LINE 官方帳號規定：如果顧客只有機器人單向發送訊息，官方帳號後台是無法開啟 1 對 1 真人聊天的！所以訂購按鈕要設定成<strong>傳送文字（message action）</strong>，不要用只送資料的 postback（即使加上 displayText，系統收到的也不是文字訊息，分流規則會比對不到），當客人按下「立即預約」時，系統會自動在對話框產生一條客人送出的文字紀錄。這樣不僅客人的聊天室有白紙黑字的訂單憑證，管理員登入 LINE Official Account Manager 後台也能立即在「聊天 (Chat)」看見這位客人，隨時接手真人客服或打上標籤！'
      },
      {
        title: '訊息分流規則：誰送的字，走哪條路',
        body: '按鈕送出的文字有<strong>固定格式</strong>（例如「👉 我要預約【頭部芳香放鬆】」），客人自己打字幾乎不可能剛好打出這個格式。所以系統比對的是「格式」，不是「預約」兩個字。<br><br>' +
          '<div class="glossary-table"><table><thead><tr><th>順序</th><th>收到的文字</th><th>處理方式</th><th>真人接手中也處理？</th></tr></thead><tbody>' +
          '<tr><td>1</td><td>開頭是「👉 我要預約【」</td><td>建立預約、通知管理員</td><td>✅ 照常</td></tr>' +
          '<tr><td>2</td><td>「瀏覽商品」</td><td>回傳商品輪播</td><td>✅ 照常</td></tr>' +
          '<tr><td>3</td><td>「聯絡客服」或「人工」</td><td>進入真人接手模式、通知管理員</td><td>只延長時間</td></tr>' +
          '<tr><td>4</td><td>這位客人在真人接手中</td><td>不回應，留給真人</td><td></td></tr>' +
          '<tr><td>5</td><td>其他文字</td><td>AI 依第一天的 FAQ 回答</td><td></td></tr>' +
          '</tbody></table></div>',
        tip: '💡 <strong>會改動資料的事交給固定規則，回答問題交給 AI。</strong>客人打「我上次預約的是幾點？」，如果讓 AI 判斷要不要建立預約，它偶爾會判斷錯。所以 AI 永遠不能建立、修改或取消預約。',
        checklist: ['說得出「我要預約」和「👉 我要預約【…】」為什麼走不同的路', '知道真人接手時，按鈕預約仍然會被處理']
      },
      {
        title: 'Ch4 - Cloudflare 環境建置',
        image: '03_Cloudflare環境建置.png',
        body: '<div class="antifraud-notice">✅ <strong>第一天已完成</strong>：Codex 已經登入過你的 Cloudflare。請 Codex 執行 <code>npx wrangler whoami</code>，確認還是登入狀態就好。</div><br>' +
          '換電腦或還沒有帳號的同學：<a href="https://dash.cloudflare.com/sign-up" target="_blank" class="ext-link-btn">🔗 開啟 Cloudflare 註冊頁面</a>，用 <strong>Gmail 帳號</strong>快速登入。',
        checklist: ['Codex 確認 Cloudflare 仍是登入狀態'],
        extra: '⏱️ 第一天做過的話，約 5 分鐘'
      },
      {
        title: '安裝 Cloudflare Skill（給 Codex 的操作手冊）',
        body: 'Skill 就像幫 Codex 裝一本「Cloudflare 操作手冊」，之後建資料庫、查錯誤時，它會照手冊的安全步驟做（先查看、跟你確認、再動手）。<br><br>' +
          '<strong>Step 1：</strong>把老師發的 <strong>cloudflare</strong> 資料夾存到電腦的「<strong>下載</strong>」資料夾（是壓縮檔的話先解壓縮）。<br><br>' +
          '<strong>Step 2：</strong>在 Codex 貼上下面這段話。',
        promptBox: {
          id: 'skill_install_prompt',
          buttonText: '複製安裝提示詞',
          text: '老師給了我一個 Cloudflare 的 skill，資料夾名稱是 cloudflare，放在我電腦的「下載」資料夾裡。\n請幫我安裝成「每個專案都能用」的 skill：\n1. 找到這個資料夾，確認裡面有 SKILL.md\n2. 把整個資料夾複製到我的使用者資料夾底下的 .agents/skills/cloudflare（資料夾不存在就建立）\n3. 告訴我安裝好了沒有，以及你現在看不看得到這個 skill；需要重開 Codex 才看得到的話，請直接告訴我\n請用繁體中文白話回答我。'
        },
        checklist: [
          'Codex 回報已安裝到 .agents/skills/cloudflare',
          '重開 Codex 後，問它「你有 cloudflare 這個 skill 嗎？」，它回答有'
        ],
        tip: '💡 裝在「使用者資料夾」而不是某一個專案裡，是因為今天的專案資料夾（line-shop）等一下才會建立。裝在這裡，以後每個專案都用得到。'
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
        tip: '💡 <strong>為什麼要定義這些欄位？</strong><br>把這個步驟想成「跟 AI 說你要開什麼類型的店、要記錄哪些客人資料」。你描述得越清楚，AI 建出來的系統就越貼近你的需求。等等我們會把這份規格跟 LINE 憑證一起「打包」交給 AI。<br><br>' +
          '除了商品和訂單，系統還會自動多兩張表（不用填，整合提示詞已經寫好）：<br>' +
          '1. <strong>客人狀態</strong>：這位客人要不要用 AI 回答、真人接手到幾點<br>' +
          '2. <strong>問題紀錄</strong>：AI 答不出來的問題，讓你知道 FAQ 該補什麼'
      }
    ]
  },
  {
    id: 'afternoon1', label: 'Step 1-4 建置核心', color: 's3',
    title: '實作前段：整合提示詞與核心系統',
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
          '訂單切換「已付款／未付款」',
          '刪除訂單後，庫存加回去'
        ],
        extra: '⏱️ 預估此步驟實作與排障時間：30 - 45 分鐘'
      },
      {
        title: 'Step 3 - 本地資料庫連接與測試',
        body: '在本地環境模擬連接 D1 資料庫，確認商品與訂單的核心功能完全正常。',
        checklist: [
          'Codex 在本機建立資料表（wrangler d1 execute --local）',
          'Codex 啟動本地測試網站 npm run dev（在自己電腦開一個暫時的測試網頁）',
          '打開 Codex 給的本地後台網址，新增一個商品、改一次、再刪掉'
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
        checklist: ['建立 D1 Database', '取得 Database ID', 'Codex 把 Database ID 填進 wrangler 設定檔'],
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
        body: '將 LINE OA 與你的 Worker 系統連接起來（Webhook = 門鈴。客人在 LINE 敲你，LINE 就去按 Cloudflare 的門鈴）<br><br>' +
          '<div class="antifraud-notice">⚠️ 今天是<strong>新的 Worker</strong>，網址和第一天不一樣。LINE Developers 的 Webhook URL 要<strong>換成今天的網址</strong>，不然訊息還是會送到第一天的機器人。</div><br>' +
          '<strong>Step 1：</strong>LINE Developers &rarr; Messaging API 分頁 &rarr; Webhook URL 改成「<strong>今天的 Worker URL/webhook/line</strong>」&rarr; Verify。<br><br>' +
          '<strong>Step 2：</strong>確認「Use webhook」開啟、OA Manager 的「自動回應訊息」關閉、「聊天」開啟（第一天設過，再看一次）。',
        checklist: [
          'Webhook URL 已換成今天的 Worker 網址',
          'Webhook Verify 顯示 Success',
          '手機問一題 FAQ，今天的系統有回答'
        ]
      },
      {
        title: 'Step 9 - 建立 Rich Menu',
        body: '<strong>Step 1：</strong>複製下方的產圖提示詞，貼到 <strong>ChatGPT</strong> 產生選單底圖，下載圖片。<br><br>' +
          '<strong>Step 2：</strong>LINE 規定選單圖片的尺寸是固定的。把圖片交給 Codex，說：「<strong>請把這張圖轉成 2500×843 的 JPG，檔案小於 1MB，左右兩格的文字要完整保留</strong>」。<br><br>' +
          '<strong>Step 3：</strong>OA Manager &rarr; 圖文選單 &rarr; 建立 &rarr; 版型選「<strong>小型、左右兩格</strong>」&rarr; 上傳 Codex 轉好的圖片。<br><br>' +
          '<strong>Step 4：</strong>左邊格子的動作選「<strong>文字</strong>」，內容填「瀏覽商品」；右邊選「<strong>文字</strong>」，填「聯絡客服」。<br><br>' +
          '<strong>Step 5：</strong>設定顯示期間、儲存，用手機重新打開官方帳號的聊天室確認選單出現。',
        promptBox: {
          id: 'rich_menu_image_prompt',
          buttonText: '複製選單產圖提示詞'
        },
        checklist: [
          '兩個按鈕的動作都是「文字」，不是連結',
          '按左邊會送出「瀏覽商品」，收到商品輪播',
          '按右邊會送出「聯絡客服」，進入真人接手'
        ],
        tip: '💡 動作一定要選「文字」：客人按下去，聊天室會真的出現一句話，系統才收得到，OA 聊天室也會留下這位客人。'
      },
      {
        title: 'Step 10 - 預約流程打通',
        body: '完成端到端的流程測試',
        flow: ['手機點選商品', '系統回傳列表', '點擊訂購產生文字訊息', '寫入 LINE Chat 記錄', '系統寫入 D1 扣庫存', '發送雙向即時通知'],
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
          '按下訂購時對話框正確產生文字訊息（LINE Chat 留下對話紀錄）',
          '訂單建立成功且名額庫存正確扣減',
          'Webhook 正常運作',
          'Rich Menu 正常顯示',
          '管理員即時收到下單推播',
          '客戶即時收到確認通知',
          '自己打「我要預約」：AI 引導點選單，沒有建立訂單',
          '問一題 FAQ：AI 依第一天的 FAQ 回答',
          '按「聯絡客服」後再傳訊息：機器人不回應，管理員收到通知',
          '真人接手中按預約按鈕：仍然建立訂單',
          '沒輸入密碼打不開後台；輸入 Codex 給的密碼才看得到',
          '後台看得到真人接手中的客人，可以手動結束',
          '後台看得到 AI 答不出來的問題'
        ],
        result: '全部通過 = MVP 完成 🚀'
      },
      {
        title: '🔑 最後一步：換一把新鑰匙',
        body: '這兩天你把鑰匙貼給了 AI，讓它幫你把系統接起來。現在你已經知道每一把鑰匙在管什麼了，最後一步是<strong>把它們換掉</strong>，讓舊的鑰匙失效。<br><br>' +
          '<strong>Step 1：</strong>LINE Developers &rarr; Messaging API &rarr; Channel access token &rarr; <strong>Reissue</strong>，取得新的 Token。<br><br>' +
          '<strong>Step 2：</strong>Google AI Studio &rarr; 建立一把新的 API Key，<strong>刪除舊的</strong>。<br><br>' +
          '<strong>Step 3：</strong>到 Cloudflare 後台 &rarr; Workers &rarr; 你的 Worker &rarr; 設定 &rarr; 變數和秘密，把兩把新鑰匙貼上取代舊的。<br><br>' +
          '<strong>Step 4：</strong>用手機再測一次 FAQ 和預約，確認系統正常。<br><br>' +
          '第一天的 Worker 已經沒有在用了（Webhook 換到今天的網址），可以請 Codex 執行 <code>npx wrangler delete line-ai-faq</code> 把它刪掉。',
        checklist: [
          'LINE Access Token 已重新發行',
          'Gemini 舊金鑰已刪除，新金鑰已建立',
          'Cloudflare 上的鑰匙已更新',
          '手機測試正常'
        ],
        tip: '💡 <strong>為什麼要換？</strong>鑰匙貼給 AI 之後，會留在對話紀錄裡。換掉以後，就算舊的對話被別人看到，也拿不到你的帳號權限。以後正式經營，鑰匙只放在 Cloudflare 的「秘密」裡，不再貼給任何人。'
      },
      {
        title: '備援方案',
        body: '每個人的 Codex 寫出來的程式都不一樣，沒有一份可以直接套用的備用專案。卡住時這樣處理：',
        checklist: [
          '把錯誤畫面截圖交給 Codex，請它只修這一個問題',
          '卡超過 10 分鐘，老師接手一起排錯',
          '時間真的不夠：先用老師的示範官方帳號體驗完整流程，課後老師再協助完成'
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
