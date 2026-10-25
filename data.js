// Same four examples as Day 1's FAQ templates; one product row per sellable item or bookable time slot.
const TEMPLATES = {
  handmade: {
    label: '🧁 手作小店', sub: '賣商品、週末出貨',
    productFields: '商品名稱,商品介紹, 價格, 上下架狀態, 出貨日, 剩餘庫存',
    orderFields: '購買人姓名, 商品名稱, 出貨日, 付款狀態',
    adminNotify: '系統通知：[購買人姓名] 訂了 [商品名稱]，[出貨日] 出貨，剩餘庫存：[剩餘庫存] 份。',
    userNotify: '[購買人姓名] 您好！訂單成立 🎉 商品：[商品名稱]，預計 [出貨日] 出貨，單號：[單號]。可以轉帳或貨到付款，老闆會再跟您確認。'
  },
  engineering: {
    label: '🏗️ 工程公司', sub: '預約到府丈量',
    productFields: '服務名稱,服務介紹, 價格, 上下架狀態, 丈量日期, 剩餘名額',
    orderFields: '業主姓名, 服務名稱, 丈量日期, 付款狀態',
    adminNotify: '系統通知：[業主姓名] 預約了 [服務名稱]，丈量日期：[丈量日期]，剩餘名額：[剩餘名額] 組。請聯絡業主確認地址。',
    userNotify: '[業主姓名] 您好！已收到您的預約 🎉 服務：[服務名稱]，丈量日期：[丈量日期]，單號：[單號]。我們會再聯絡您確認地址，報價單會在丈量後 5 個工作天內寄出。'
  },
  design: {
    label: '🎨 設計接案', sub: '接案方案、每月限量',
    productFields: '方案名稱,方案介紹, 價格, 上下架狀態, 交件天數, 本月剩餘名額',
    orderFields: '客戶姓名, 方案名稱, 交件天數, 付款狀態',
    adminNotify: '系統通知：[客戶姓名] 委託了 [方案名稱]，本月剩餘名額：[本月剩餘名額] 個。記得先收 50% 訂金再開工。',
    userNotify: '[客戶姓名] 您好！已收到您的委託 🎉 方案：[方案名稱]，收到訂金後 [交件天數] 交件，單號：[單號]。我們會再傳訂金資訊給您。'
  },
  massage: {
    label: '🌿 精油按摩', sub: '預約時段',
    productFields: '服務名稱,服務介紹, 價格, 服務時長, 上下架狀態, 預約時段, 剩餘名額',
    orderFields: '客人姓名, 服務名稱, 預約時段, 付款狀態',
    adminNotify: '系統通知：[客人姓名] 預約了 [服務名稱]，時段：[預約時段]，剩餘名額：[剩餘名額] 位。',
    userNotify: '[客人姓名] 您好！預約成功 🎉 服務：[服務名稱]，時段：[預約時段]，單號：[單號]。改期請在 24 小時前告知，遲到超過 20 分鐘視同取消。'
  }
};

const STAGES = [
  {
    id: 'overview', label: '課程總覽', color: 's1',
    title: 'Vibe Coding 手把手實戰班',
    desc: '第二天：把第一天的 FAQ 機器人升級成有後台的 AI 客服，再加上預約或賣商品',
    steps: [
      {
        title: '🌟 什麼是 Vibe Coding？',
        body: '在開始動手之前，先搞懂今天我們到底在做什麼。',
        vibeCodingIntro: true
      },
      {
        title: '課程目標',
        body: '學員在 6 小時內完成一套可運作的 LINE OA 銷售/預約系統 MVP。<br>真正想教的能力：如何把商業需求拆解成系統需求，並透過 AI 完成系統建置。<br><br>' +
          '<strong>上午</strong>做出第一張圖：AI 依 FAQ 回答，客人要找真人時通知老闆。<br><strong>下午</strong>做出第二張圖：客人點選單、看商品、按預約，名額自動扣減。',
        image: ['faq流程圖.png', 'line流程圖.png'],
        checklist: ['上午：FAQ 線上修改', '上午：每位客人的 AI 開關、真人接手', '上午：問題紀錄', '下午：商品管理', '下午：訂單管理', '下午：Rich Menu', '下午：雙向 LINE 通知', 'MVP 上線']
      },
      {
        title: '🗓️ 今日排程（第二天）',
        body: '上午先把第一天的 FAQ 機器人升級成有後台的 AI 客服，下午在同一個系統加上預約或賣商品。' +
          '<div class="glossary-table"><table><thead><tr><th>時間</th><th>內容</th><th>對應步驟</th></tr></thead><tbody>' +
          '<tr><td colspan="3"><strong>上午：AI 客服後台</strong></td></tr>' +
          '<tr><td>00:00–00:20</td><td>複習：昨天的機器人，和它的三個問題</td><td>開場</td></tr>' +
          '<tr><td>00:20–00:40</td><td>今天的目標、確認 LINE 資料、Cloudflare、Skill</td><td>準備</td></tr>' +
          '<tr><td>00:40–01:40</td><td>提示詞 A：建立 AI 客服後台、本機測試</td><td>A1–A2</td></tr>' +
          '<tr><td>01:40–02:20</td><td>建立雲端 D1、部署、手機確認升級成功</td><td>A3–A4</td></tr>' +
          '<tr><td>02:20–02:50</td><td>營運演練：補 FAQ、關 AI 一對一、整理要上架的項目</td><td>A5</td></tr>' +
          '<tr><td colspan="3"><strong>下午：預約與商品</strong></td></tr>' +
          '<tr><td>02:50–03:10</td><td>完整訊息分流、建立商品與訂單規格</td><td>規格</td></tr>' +
          '<tr><td>03:10–04:20</td><td>提示詞 B：加上商品與預約、本機測試、部署更新</td><td>B1–B3</td></tr>' +
          '<tr><td>04:20–05:00</td><td>用 AI 產生選單圖，請 Codex 上傳並啟用圖文選單</td><td>B4–B5</td></tr>' +
          '<tr><td>05:00–05:30</td><td>預約流程打通、驗收</td><td>B6、驗收</td></tr>' +
          '<tr><td>05:30–06:00</td><td>換一把新鑰匙、緩衝</td><td>驗收</td></tr>' +
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
        title: '📦 下載教材包',
        body: '第二天的實作與驗收文件、開發提示詞範本、備用選單圖都在裡面。下載後在「下載」資料夾按右鍵 &rarr; 「解壓縮全部」，打開「第二天」資料夾。<br><br>' +
          '<a href="downloads/兩天學員教材.zip" download class="ext-link-btn">⬇️ 下載兩天完整教材包</a>'
      },
      {
        title: '📋 上課前檢查',
        body: '第二天直接接著第一天做，開始前確認這幾件事：',
        checklist: [
          '✅ 帶第一天同一台筆電與充電線',
          '✅ 用第一天同一個瀏覽器打開本頁，LINE 資料和 FAQ 才會自動帶入',
          '✅ Codex 可以正常登入（ChatGPT Plus 仍在訂閱中）',
          '✅ 手機 LINE 可以傳訊息給自己的官方帳號'
        ],
        extra: '⚠️ 換了電腦或瀏覽器也沒關係，「複習與準備」分頁會帶你把資料重新填好。'
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
    id: 'morning1', label: '複習與準備', color: 's1',
    title: '上午開場：昨天的機器人，和它的三個問題',
    desc: '確認第一天的機器人還在，找出它做不到的事，再把今天要用的資料準備好',
    steps: [
      {
        title: '複習：第一天的 FAQ 機器人還能用嗎？',
        body: '用手機問你的官方帳號一題 FAQ，確認昨天的機器人還在運作。<br><br>' +
          '昨天的機器人很好用，但有三個問題：<br>' +
          '1. <strong>真人在聊天室回覆時，機器人也跟著回</strong>：它沒有記憶，不知道真人已經在處理<br>' +
          '2. <strong>改 FAQ 要請 Codex 改檔案、重新部署</strong>：沒辦法自己上網頁修改<br>' +
          '3. <strong>不知道客人問了哪些答不出來的問題</strong>：FAQ 不知道該補什麼<br><br>' +
          '今天上午先把這三個問題解決，做出一個<strong>有後台的 AI 客服</strong>；下午再加上<strong>預約或賣商品</strong>。',
        checklist: ['手機問一題 FAQ，機器人有回答', '說得出昨天機器人的三個問題']
      },
      {
        title: '今天要完成什麼',
        body: '今天直接在<strong>第一天的專案</strong>（line-ai-faq）上繼續加功能，網址不變，分兩段蓋：',
        checklist: [
          '✅ 上午：AI 客服後台（後台密碼、FAQ 線上修改、每位客人的 AI 開關、真人接手、問題紀錄）',
          '✅ 下午：商品管理、上下架、庫存或名額',
          '✅ 下午：按下訂購鍵在對話框產生文字訊息（LINE 官方帳號聊天室留下紀錄）',
          '✅ 下午：訂單管理、圖文選單、雙向即時通知（顧客確認＋管理員推播）',
          '❌ 不包含：金流、CRM、會員系統',
          '❌ 不包含：Google Calendar、自動排課、LIFF、多角色權限'
        ],
        tip: '💡 <strong>為什麼先做客服、再做預約？</strong>上午做完，你手上就有一個能用的 AI 客服；營運演練時你會看到客人最常問哪些商品或服務，下午就先把它們上架。'
      },
      {
        title: 'LINE 連線資料',
        image: '01_LINE三把鑰匙.png',
        body: '<div class="antifraud-notice">✅ <strong>第一天已完成這一步</strong>：用同一瀏覽器設定檔、同一網站網址開啟本頁，下方欄位會自動帶入第一天填的資料。換電腦的同學，請依步驟重新取得並填寫。</div><br>' +
          '<strong>Step 1：</strong>開啟 <a href="https://manager.line.biz/" target="_blank" class="ext-link-btn">🔗 LINE Official Account Manager</a>，確認 設定 &rarr; Messaging API 已啟用。<br><br>' +
          '<strong>Step 2：</strong>開啟 <a href="https://developers.line.biz/" target="_blank" class="ext-link-btn">🔗 LINE Developers</a>，找到對應的 Channel，取得：<br>' +
          '- <strong>Channel ID</strong> 與 <strong>Channel Secret</strong>：Basic settings<br>' +
          '- <strong>Your user ID（管理員 LINE UID）</strong>：Basic settings 最下方，U 開頭的 33 碼<br>' +
          '- <strong>Channel Access Token</strong>：Messaging API 分頁最下方 Issue',
        checklist: [
          '下方四個欄位都有資料（自動帶入或重新填寫）',
          '管理員 LINE UID 是 U 開頭的 33 碼'
        ],
        tip: '💡 <strong>這三項 LINE 資料有什麼用？</strong><br>1. <strong>Channel Secret</strong> 是「門禁密碼」：確認訊息真的來自 LINE<br>2. <strong>Access Token</strong> 是「發話遙控器」：讓系統可以回覆、推播<br>3. <strong>Your user ID</strong> 是「老闆專屬信箱」：客人找真人或下單時通知你<br>User ID 是收件人識別碼，不是密碼。要保密並在最後更換的是 Channel Secret、Access Token 和 Gemini API Key。',
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
        title: '第一天的 Gemini 鑰匙',
        checklist: ['Gemini API Key 有資料'],
        body: '同一瀏覽器設定檔、同一網站網址會自動帶入。<strong>FAQ 不用再貼</strong>：它已經在第一天的專案裡，Codex 會直接把它搬進資料庫。',
        worksheet: {
          title: '第一天資料（同一瀏覽器設定檔、同一網站網址會自動帶入）',
          fields: [
            { id: 'gemini_api_key', label: 'Gemini API Key', type: 'text', hint: '第一天在 Google AI Studio 建立的金鑰' }
          ]
        }
      },
      {
        title: '確認 Cloudflare 登入',
        image: '03_Cloudflare環境建置.png',
        body: '<div class="antifraud-notice">✅ <strong>第一天已完成</strong>：Codex 已經登入過你的 Cloudflare。請 Codex 執行 <code>npx wrangler whoami</code>，確認還是登入狀態就好。</div><br>' +
          '換電腦或還沒有帳號的同學：<a href="https://dash.cloudflare.com/sign-up" target="_blank" class="ext-link-btn">🔗 開啟 Cloudflare 註冊頁面</a>，用 <strong>Gmail 帳號</strong>快速登入。',
        checklist: ['Codex 確認 Cloudflare 仍是登入狀態'],
        extra: '⏱️ 第一天做過的話，約 5 分鐘'
      },
      {
        title: '確認 Cloudflare Skill（第一天已安裝）',
        body: '第一天已經幫 Codex 裝好「Cloudflare 操作手冊」（skill），今天建資料庫、查錯誤時會用到它。先請 Codex 確認它還在。<br><br>' +
          '<strong>Step 1：</strong>在 Codex 貼上下面這段話。第一天裝好的話，它會直接回報「已安裝」，這一步就完成了。<br><br>' +
          '<strong>Step 2（第一天沒裝到、或換了電腦才需要）：</strong>開啟 <a href="https://drive.google.com/drive/u/0/folders/1GElvP2OY2pYHxTTBLERVxVUVeoRhlYi7" target="_blank" class="ext-link-btn">🔗 Cloudflare Skill 下載（Google 雲端硬碟）</a>，在 <strong>cloudflare</strong> 資料夾上按右鍵 &rarr; 「下載」，到「<strong>下載</strong>」資料夾按右鍵 &rarr; 「解壓縮全部」，再把同一段話貼給 Codex 一次。',
        promptBox: {
          id: 'skill_install_prompt',
          buttonText: '複製確認提示詞',
          text: '請幫我確認 Cloudflare 的 skill 有沒有裝好：\n1. 檢查我的使用者資料夾底下有沒有 .agents/skills/cloudflare，而且裡面有 SKILL.md\n2. 有的話，告訴我「已安裝」，以及你現在看不看得到這個 skill，其他什麼都不用做\n3. 沒有的話，到我電腦的「下載」資料夾找名稱是 cloudflare 的資料夾（可能在解壓縮後的資料夾裡面），確認裡面有 SKILL.md，再把整個資料夾複製到 .agents/skills/cloudflare（資料夾不存在就建立）\n4. 下載資料夾也找不到的話，直接告訴我，我會先去下載\n需要重開 Codex 才看得到 skill 的話，請直接告訴我。請用繁體中文白話回答我。'
        },
        checklist: [
          'Codex 回報 .agents/skills/cloudflare 已安裝',
          '問 Codex「你有 cloudflare 這個 skill 嗎？」，它回答有'
        ],
        tip: '💡 skill 裝在「使用者資料夾」，不是裝在某個專案裡，所以第一天裝的今天照樣能用，今天升級 line-ai-faq 時也用得到。'
      }
    ]
  },
  {
    id: 'faqadmin', label: '上午：AI 客服後台', color: 's2',
    title: '上午：把 FAQ 機器人升級成有後台的 AI 客服',
    desc: '一段提示詞建好後台、資料庫和真人接手，部署上線後用營運演練把 FAQ 補完整',
    steps: [
      {
        title: '上午的訊息分流：誰該回、誰不該回',
        body: '系統多了資料庫，就能記得每位客人的狀態。收到客人的文字訊息時，由上往下判斷：<br><br>' +
          '<div class="glossary-table"><table><thead><tr><th>順序</th><th>收到的文字</th><th>處理方式</th></tr></thead><tbody>' +
          '<tr><td>1</td><td>「聯絡客服」或「人工」</td><td>進入真人接手模式，通知老闆；接手中再傳只延長時間</td></tr>' +
          '<tr><td>2</td><td>這位客人在後台被關掉 AI，或在真人接手中</td><td>不回應，留給你在 OA 聊天室一對一回覆</td></tr>' +
          '<tr><td>3</td><td>其他文字</td><td>AI 依後台裡最新的 FAQ 回答；答不出來的記進問題紀錄</td></tr>' +
          '</tbody></table></div>' +
          '<br><strong>兩種「AI 先別回」的差別：</strong>客人傳「人工」是<strong>暫時</strong>的，客人 30 分鐘沒說話就恢復 AI；在後台把某位客人的「AI 自動回覆」關掉是<strong>永久</strong>的，要你自己再打開。',
        checklist: ['知道想跟某位客人一對一聊天時，要先在後台關掉他的 AI', '說得出「傳人工」和「後台關 AI」的差別']
      },
      {
        title: 'Step A1 - 交給 Codex：建立 AI 客服後台',
        body: '下面的提示詞已經自動放進你的管理員 UID 和鑰匙。請在 Codex 打開<strong>第一天的 line-ai-faq 資料夾</strong>，開一個新對話，整段貼上。',
        promptBox: {
          id: 'faq_system_prompt',
          buttonText: '複製提示詞 A（AI 客服後台）'
        },
        checklist: [
          'Codex 用三句白話說明了計畫，而且先存了還原點',
          'Codex 讓你自己輸入後台密碼（至少 6 碼），沒有顯示在畫面上'
        ],
        tip: '💡 <strong>這段提示詞在做什麼？</strong>把要加的功能用白話一次交給 AI。你負責說需求、按允許、驗收結果；AI 負責寫程式、建資料庫。',
        extra: '⏱️ 預估實作與排障時間：40 - 60 分鐘'
      },
      {
        title: 'Step A2 - 在自己電腦上試後台',
        body: 'Codex 會先在你的電腦開一個暫時的測試網站（npm run dev），給你本機後台網址。打開它，逐項試：',
        checklist: [
          '沒輸入密碼打不開後台，輸入自己設的密碼才看得到',
          '「FAQ 管理」的大文字框裡，看得到第一天的 FAQ',
          '改一句 FAQ 存檔，再按「還原上一版」，內容回來了',
          '「客人管理」和「問題紀錄」頁面打得開（現在還是空的沒關係）'
        ],
        extra: '⏱️ 預估：15 - 20 分鐘'
      },
      {
        title: 'Step A3 - 建立雲端資料庫並部署',
        body: '本機試過沒問題後，跟 Codex 說「<strong>可以了，請建立雲端 D1 並部署</strong>」。它會建立雲端資料庫（D1，像一本放在雲端的超級 Excel）、設定後台密碼，部署到第一天的同一個 Worker。<br><br>' +
          '完成後，Codex 會給你後台網址，並確認 Webhook 網址和第一天一樣。',
        checklist: [
          'Codex 回報雲端 D1 建立完成',
          'Codex 回報部署成功，給了後台網址',
          '用手機或電腦打開雲端後台網址，輸入密碼登入成功'
        ],
        worksheet: {
          title: '部署資訊記錄（下午會用到）',
          fields: [
            { id: 'cloudflare_db_name', label: 'D1 資料庫名稱', type: 'text', hint: 'Codex 建立的名稱，例如：line-ai-faq-db' },
            { id: 'cloudflare_worker_url', label: 'Worker 網址', type: 'text', hint: '和第一天一樣，例如：https://line-ai-faq.xxx.workers.dev' }
          ]
        },
        extra: '⏱️ 預估：15 - 25 分鐘'
      },
      {
        title: 'Step A4 - 用手機確認升級成功',
        body: '今天是升級<strong>第一天的同一個 Worker</strong>，網址沒變，LINE 的 Webhook <strong>不用重填</strong>。直接用手機試：',
        checklist: [
          '手機問一題 FAQ，AI 照常回答',
          '後台「客人管理」出現了你自己',
          '傳「人工」：收到「已轉給真人客服」，自己的 LINE 也收到通知'
        ],
        tip: '💡 手機沒有反應的話，到 LINE Developers 的 Messaging API 分頁按 Webhook 的 Verify，把結果截圖給 Codex 看。'
      },
      {
        title: 'Step A5 - 營運演練：把 FAQ 補完整',
        body: '兩人一組，一個扮<strong>客人</strong>（用手機傳訊息給對方的官方帳號），一個扮<strong>老闆</strong>（看自己的後台），做完再交換。<br><br>' +
          '<strong>1. 問倒 AI：</strong>客人問 3 個 FAQ 沒寫到的問題，AI 會請客人傳「人工」。<br><br>' +
          '<strong>2. 補 FAQ：</strong>老闆到「問題紀錄」看到這些問題，在「FAQ 管理」補上答案、存檔。<br><br>' +
          '<strong>3. 再問一次：</strong>客人問同樣的問題，AI 這次答得出來（不用重新部署）。<br><br>' +
          '<strong>4. 一對一聊天：</strong>老闆在「客人管理」關掉這位客人的 AI，到 OA Manager 聊天室直接回覆；客人再傳一般問題，機器人不會插話。聊完記得把 AI 打開。<br><br>' +
          '<strong>5. 整理下午要上架的項目：</strong>看看客人問最多的是哪些商品或服務，寫在下面。下午的提示詞會自動帶入，先建成商品草稿。',
        checklist: [
          '問題紀錄裡看得到客人問倒 AI 的題目',
          '補完 FAQ 後，同一題 AI 答得出來',
          '關掉 AI 後，可以在 OA 聊天室一對一聊天，機器人沒有插話',
          '寫下下午要先上架的 2 到 3 個項目'
        ],
        worksheet: {
          title: '下午要先上架的項目',
          fields: [
            { id: 'popular_items', label: '客人最常問的商品或服務（一行一項，只寫名稱和一句介紹，價格之後在後台填）', type: 'textarea', hint: '例如：頭部芳香放鬆 - 30 分鐘舒壓按摩' }
          ]
        },
        result: '🎉 上午完成：你有一個自己能管理的 AI 客服了！',
        extra: '⏱️ 預估：30 分鐘'
      },
      {
        title: '🗣️ AI 溝通心法與語音輸入',
        body: '遇到卡關或想要改功能，如何最有效率地跟 AI 溝通？',
        aiTips: true
      }
    ]
  },
  {
    id: 'booking', label: '下午：預約與商品', color: 's3',
    title: '下午：在同一個系統加上預約或賣商品',
    desc: '定義商品與訂單規格，讓 Codex 在上午的系統上加功能，接上圖文選單完成預約流程',
    steps: [
      {
        title: '預約的訊息怎麼走',
        image: '02_技術架構總覽.png',
        body: '下午加上預約後，訊息進來要先<strong>分流</strong>：按鈕送出的指令走預約，客人自己打的字照樣走上午的 AI 客服。',
        flow: ['使用者傳送/點擊選單', '對話框產生訂購文字', 'LINE 平台轉發 Webhook', 'Cloudflare Worker 處理', 'D1 資料庫扣庫存', 'Messaging API 雙向推播', 'LINE 官方後台記錄 Chat', '使用者與管理者接收'],
        tip: '💡 <strong>關鍵細節：為什麼按下訂購鍵時，對話框一定要產生文字？</strong><br>如果顧客只有機器人單向發送訊息，官方帳號後台的聊天室看不到這位客人。所以訂購按鈕要設定成<strong>傳送文字（message action）</strong>，不要用只送資料的 postback（即使加上 displayText，系統收到的也不是文字訊息，分流規則會比對不到）。客人按下「立即預約」時，對話框會出現一條客人送出的文字，客人有訂單憑證，你在 OA Manager 的聊天室也能立刻看到這位客人。'
      },
      {
        title: '完整的訊息分流規則',
        body: '按鈕送出的文字有<strong>固定格式</strong>（例如「👉 我要預約【頭部芳香放鬆】」），手動打出相同完整格式也會觸發下單；固定格式不是身分驗證。所以系統比對的是「格式」，不是「預約」兩個字。<br><br>' +
          '<div class="glossary-table"><table><thead><tr><th>順序</th><th>收到的文字</th><th>處理方式</th><th>AI 關閉或真人接手中也處理？</th></tr></thead><tbody>' +
          '<tr><td>1</td><td>開頭是「👉 我要預約【」</td><td>建立預約、通知管理員</td><td>✅ 照常</td></tr>' +
          '<tr><td>2</td><td>「瀏覽商品」</td><td>回傳商品輪播</td><td>✅ 照常</td></tr>' +
          '<tr><td>3</td><td>「聯絡客服」或「人工」</td><td>進入真人接手模式、通知管理員</td><td>只延長時間</td></tr>' +
          '<tr><td>4</td><td>這位客人在後台被關掉 AI，或在真人接手中</td><td>不回應，留給你在 OA 聊天室一對一回覆</td><td></td></tr>' +
          '<tr><td>5</td><td>其他文字</td><td>AI 依後台裡最新的 FAQ 回答</td><td></td></tr>' +
          '</tbody></table></div>' +
          '<br>第 3 到 5 條就是上午做好的，下午只是在最前面加上第 1、2 條。',
        tip: '💡 <strong>會改動資料的事交給固定規則，回答問題交給 AI。</strong>客人打「我上次預約的是幾點？」，如果讓 AI 判斷要不要建立預約，它偶爾會判斷錯。所以 AI 永遠不能建立、修改或取消預約。',
        checklist: ['說得出「我要預約」和「👉 我要預約【…】」為什麼走不同的路', '知道關掉 AI 或真人接手時，按鈕預約仍然會被處理']
      },
      {
        title: '建立商品與訂單規格',
        body: '定義你的商品表與訂單表的欄位結構。AI 等一下要根據這份規格，在上午的系統上加功能。<br><br>👇 <strong>選你第一天 FAQ 用的同一個範例</strong>，再改成自己的。有時段的服務（按摩、丈量），<strong>一個時段就是一個商品</strong>，例如「全身精油按摩 90 分鐘｜10/30 14:00」。',
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
        tip: '💡 <strong>為什麼要定義這些欄位？</strong><br>把這個步驟想成「跟 AI 說你要開什麼類型的店、要記錄哪些客人資料」。你描述得越清楚，AI 建出來的系統就越貼近你的需求。'
      },
      {
        title: 'Step B1 - 交給 Codex：加上商品與預約',
        body: '回到<strong>上午同一個 Codex 對話</strong>（或在 line-ai-faq 資料夾開新對話），整段貼上。這段提示詞不含鑰匙：上午已經存進 Cloudflare 了。',
        promptBox: {
          id: 'booking_system_prompt',
          buttonText: '複製提示詞 B（商品與預約）'
        },
        checklist: [
          'Codex 先存了還原點（git commit），才開始改',
          'Codex 說明它要加什麼，沒有要重寫上午的功能'
        ],
        extra: '⏱️ 預估實作與排障時間：40 - 60 分鐘'
      },
      {
        title: 'Step B2 - 在自己電腦上試商品與訂單',
        body: 'Codex 改完會再開本機測試網站，打開後台逐項試：',
        checklist: [
          '「商品管理」看得到上午寫的項目草稿，補上價格和庫存後上架',
          '商品新增、修改、上下架都正常',
          '訂單可以切換「已付款／未付款」',
          '刪除訂單後，庫存加回去',
          '上午的 FAQ 管理和客人管理還能正常使用'
        ],
        extra: '⏱️ 預估：15 - 20 分鐘'
      },
      {
        title: 'Step B3 - 部署更新',
        body: '本機試過沒問題後，跟 Codex 說「<strong>可以了，請更新雲端資料庫並部署</strong>」。<br><br>' +
          '這次是<strong>更新同一個 Worker</strong>，網址不會變，LINE 的 Webhook 不用重填。',
        checklist: [
          'Codex 回報雲端 D1 已加上商品和訂單表，上午的 FAQ 和客人資料還在',
          'Codex 回報部署成功，Worker 網址和上午一樣',
          '手機問一題 FAQ，AI 照常回答'
        ],
        extra: '⏱️ 預估：10 - 15 分鐘'
      },
      {
        title: 'Step B4 - 產生選單圖片',
        body: '<strong>Step 1：</strong>複製下方的產圖提示詞，貼到 <strong>ChatGPT</strong> 產生選單圖，下載圖片。<br><br>' +
          '<strong>Step 2：</strong>把圖片放進 <strong>line-ai-faq 資料夾</strong>，檔名改成 <code>rich-menu</code>（保留原本的 .png 或 .jpg）。<br><br>' +
          '產圖超過 10 分鐘，直接下載<a href="assets/rich-menu-backup.jpg" download>備用選單圖（2500×843 JPG）</a>，一樣放進資料夾、改檔名。圖文內容可以課後再換。',
        promptBox: {
          id: 'rich_menu_image_prompt',
          buttonText: '複製選單產圖提示詞'
        },
        checklist: [
          '選單圖片已經放進 line-ai-faq 資料夾，檔名是 rich-menu'
        ],
        tip: '💡 尺寸不用自己調，下一步 Codex 會幫你轉成 LINE 規定的大小。'
      },
      {
        title: 'Step B5 - 交給 Codex：把圖片做成圖文選單',
        body: '在同一個 Codex 對話貼上下面這段話，Codex 會幫你把選單做好、放上官方帳號，<strong>不用進 OA Manager 手動設定</strong>。',
        promptBox: {
          id: 'rich_menu_setup_prompt',
          buttonText: '複製圖文選單提示詞',
          text: '幫我把 line-ai-faq 資料夾裡的 rich-menu 圖片，做成官方帳號的圖文選單，讓所有客人都看得到。\n' +
            '選單分左右兩格：左邊按下去，客人會在聊天室送出「瀏覽商品」；右邊按下去，送出「聯絡客服」。\n' +
            '圖片尺寸不對就幫我調整。做好後告訴我，我用手機確認。'
        },
        checklist: [
          'Codex 回報圖文選單做好了',
          '手機重新打開聊天室，看到下方的選單',
          '按左邊會送出「瀏覽商品」，收到商品輪播',
          '按右邊會送出「聯絡客服」，進入真人接手'
        ],
        tip: '💡 Codex 做的選單，<strong>在 OA Manager 的「圖文選單」頁面看不到</strong>，這是正常的。之後想換圖，把新圖放進資料夾，跟 Codex 說「幫我換成新的選單圖」就好。',
        extra: '⏱️ 預估：10 - 15 分鐘'
      },
      {
        title: 'Step B6 - 預約流程打通',
        body: '用手機當客人，從頭到尾走一次預約，再到後台確認結果。',
        flow: ['手機點選商品', '系統回傳列表', '點擊訂購產生文字訊息', '寫入 LINE Chat 記錄', '系統寫入 D1 扣庫存', '發送雙向即時通知'],
        checklist: [
          '按選單「瀏覽商品」，看到商品輪播',
          '按「立即預約」，聊天室出現自己送出的預約文字',
          '手機收到預約成功通知，老闆的 LINE 也收到通知',
          '後台「訂單管理」出現這筆訂單，名額或庫存少 1'
        ],
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
        title: '上午驗收：AI 客服後台',
        body: '請逐一實測，並在<a href="course/課堂驗收與交接.html">驗收與交接表</a>填實際結果；頁面勾選只代表自我檢查。',
        checklist: [
          '沒輸入密碼打不開後台；輸入自己設的密碼才看得到',
          '問一題 FAQ：AI 依後台的 FAQ 回答',
          '後台 FAQ 頁看得到第一天的 FAQ；改一句存檔後，不用重新部署，下一題就照新內容回答',
          '後台看得到所有傳過訊息的客人，真人接手中的可以手動結束',
          '後台把自己的「AI 自動回覆」關掉，再傳一般問題：機器人不回，在 OA Manager 聊天室可以直接回覆；打開後 AI 恢復回答',
          '按「聯絡客服」後再傳訊息：機器人不回應，管理員收到通知',
          '後台看得到 FAQ 缺漏問題；API 暫時失敗不誤記為 FAQ 缺漏',
          '重複按人工不再通知；永久停用 AI 不因 30 分鐘到期而恢復'
        ]
      },
      {
        title: '下午驗收：預約與商品',
        body: '下午的功能加上去之後，上午的項目也要抽測一兩項，確認沒有被改壞。',
        checklist: [
          '商品新增成功，手機按「瀏覽商品」看得到',
          'Rich Menu 正常顯示',
          '按下訂購時對話框正確產生文字訊息（LINE Chat 留下對話紀錄）',
          '訂單建立成功且名額庫存正確扣減',
          '管理員即時收到下單推播',
          '客戶即時收到確認通知',
          '自己打「我要預約」：AI 引導點選單，沒有建立訂單',
          '真人接手中或 AI 關閉時按預約按鈕：仍然建立訂單',
          '把一個商品庫存改成 0 再按預約：回覆無法預約，沒有建立訂單',
          '老師已確認事件重送、最後一份庫存競爭與重複刪單測試'
        ],
        result: '填妥驗收結果、換完憑證且複測通過，才標記本次課堂 MVP 完成'
      },
      {
        title: '🔑 最後一步：換一把新鑰匙',
        body: '這兩天貼給 AI 的三個憑證都要處理：<strong>Channel Secret、LINE Access Token、Gemini API Key</strong>。Channel ID 和 User ID 是識別碼，不需更換。<br><br>' +
          '<strong>1. 先準備：</strong>記下目前 Worker、Webhook 與三個 secret 的名稱；選短暫可停機的時間，開好 LINE、AI Studio、Cloudflare 設定頁。新值由你自行輸入，不再貼進 AI 對話或教材。<br><br>' +
          '<strong>2. Channel Secret：</strong>LINE Developers → Basic settings → Channel secret → Issue。舊值會立即失效，隨即更新目前 Worker 對應的 secret。<br><br>' +
          '<strong>3. Access Token：</strong>Messaging API → Channel access token → Reissue；依畫面確認舊 Token 失效時間，更新 Worker。<br><br>' +
          '<strong>4. Gemini：</strong>建立新 API Key → 更新 Worker → 測一題 FAQ → 刪除舊 Key。新 Key 不會重置同一專案的額度。<br><br>' +
          '<strong>5. 驗收：</strong>Webhook Verify、手機 FAQ、一次預約及雙向通知都要重測。還需本機開發時，自行更新 .dev.vars；不再用的本機副本移除舊憑證。<br><br>' +
          '<strong>6. 清理與交接：</strong>複製一段一般文字覆蓋剪貼簿。保存 FAQ、程式與網址；完成<a href="course/課堂驗收與交接.html">驗收與交接表</a>。',
        checklist: [
          'Channel Secret 與 LINE Access Token 已重新發行，Worker 已更新',
          'Gemini 舊金鑰已刪除，新金鑰已建立',
          '三個憑證在 Cloudflare 已更新',
          '手機測試正常'
        ],
        tip: '💡 <strong>為什麼要換？</strong>鑰匙貼給 AI 之後，會留在對話紀錄裡。換掉以後，就算舊的對話被別人看到，也拿不到你的帳號權限。新鑰匙由你在 Cloudflare secrets 或本機開發設定自行輸入。'
      },
      {
        title: '備援方案',
        body: '每個人的 Codex 寫出來的程式都不一樣，沒有一份可以直接套用的備用專案。卡住時這樣處理：',
        checklist: [
          '把錯誤畫面截圖交給 Codex，請它只修這一個問題',
          '卡超過 10 分鐘，老師接手一起排錯',
          '時間真的不夠：先用老師的示範官方帳號體驗完整流程，課後老師再協助完成'
        ],
        result: '完成手機驗收才標示可運作；未完成者記錄卡點、下一步與預約補課時間（由老師確認），不把體驗示範帳號當成個人專案完成'
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
