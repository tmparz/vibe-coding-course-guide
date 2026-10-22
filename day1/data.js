// DAY 1 教材資料：上半場 AI 協作，下半場 LINE 關鍵字機器人（內建關鍵字 → 自己的 AI）
// 欄位 id 與第二天共用（line_channel_secret 等），同一台電腦第二天會自動帶入

const FAQ_TEMPLATES = {
  handmade: {
    label: '🧁 手作小店',
    theme: '手作甜點小店，接受 LINE 預訂，週末才出貨',
    info: '營業時間：週一到週五 10:00-18:00 接單，週六日出貨不接單\n付款：轉帳或貨到付款，不能刷卡\n運費：滿 1000 元免運，未滿收 120 元\n保存：冷藏 5 天\n客製化：可以，但要提早 7 天預訂\n價格：還沒確定要不要漲價'
  },
  engineering: {
    label: '🏗️ 工程公司',
    theme: '室內裝修工程公司，回覆業主的常見問題',
    info: '報價：先到現場丈量，丈量免費，報價單 5 個工作天內寄出\n施工時間：週一到週六 8:30-17:30，週日不施工\n保固：水電一年、木作兩年\n付款：簽約 30%、進場 40%、完工 30%\n工期：看工程內容，要現場評估\n可以只做局部嗎：可以，但最低承接金額還沒定'
  },
  design: {
    label: '🎨 設計接案',
    theme: '個人設計師，接 LOGO 與社群圖文設計案',
    info: '服務：LOGO 設計、IG 貼文圖、活動海報\n交件時間：LOGO 10 個工作天，貼文圖 3 個工作天\n修改次數：包含 2 次修改，超過另計\n付款：先付 50% 訂金才開始\n原始檔：LOGO 會給 AI 和 PNG 檔\n急件加價：還沒決定'
  }
};

const STAGES = [
  {
    id: 'overview', label: '課程總覽', color: 's1',
    title: 'DAY 1｜和 AI 合作，讓 LINE 聽懂客人',
    desc: '上半場學會和 AI 合作，下半場讓你的 LINE 官方帳號自動回答客人的問題',
    steps: [
      {
        title: '🎯 兩天後你會做出什麼？',
        body: '講師先展示<strong>第二天的成品</strong>：客人在 LINE 點選單、看服務、按下預約，系統自動記錄並通知老闆。<br><br>今天是第一步：讓 LINE <strong>聽懂客人用自己的話問問題</strong>，並根據你給的資料回答。',
        flow: ['DAY 1｜AI 協作', 'DAY 1｜LINE 自動回答問題', 'DAY 2｜LINE 接受預約', 'DAY 2｜後台管理'],
        result: '今天帶走：一個會根據你的 FAQ 回答客人的 LINE 機器人'
      },
      {
        title: '🗓️ 今日排程',
        body: '<div class="glossary-table"><table><thead><tr><th>時間</th><th>內容</th><th>完成什麼</th></tr></thead><tbody>' +
          '<tr><td colspan="3"><strong>上半場：認識 AI、學會和 AI 合作（150 分鐘）</strong></td></tr>' +
          '<tr><td>00:00–00:15</td><td>開場：兩天成品展示</td><td>知道兩天的終點</td></tr>' +
          '<tr><td>00:15–00:45</td><td>AI 是什麼、可以幫我做什麼</td><td>說得出三件 AI 能幫你做的事</td></tr>' +
          '<tr><td>00:45–01:45</td><td>AI 協作三招</td><td>一份通知草稿、一份驗算過的預算</td></tr>' +
          '<tr><td>01:45–02:30</td><td>我的真實任務：用 AI 整理「我的 LINE 要回答的問題」</td><td>5 題以上自己的 FAQ</td></tr>' +
          '<tr><td colspan="3"><strong>下半場：讓 LINE 自動回答（210 分鐘）</strong></td></tr>' +
          '<tr><td>02:30–03:10</td><td>LINE 官方帳號：歡迎訊息、關鍵字自動回覆、開通 Messaging API</td><td>手機收到一則關鍵字回覆</td></tr>' +
          '<tr><td>03:10–03:30</td><td>LINE 訊息怎麼跑到程式裡（順便認識內建的 AI 聊天機器人）</td><td>說得出訊息走過哪四站</td></tr>' +
          '<tr><td>03:30–04:00</td><td>Cloudflare 與 Codex</td><td>Codex 能登入 Cloudflare</td></tr>' +
          '<tr><td>04:00–05:20</td><td>申請 Gemini 鑰匙 → 把所有資料交給 Codex，從零做出 FAQ 機器人 → 串接 Webhook</td><td>機器人上線</td></tr>' +
          '<tr><td>05:20–05:40</td><td>手機驗收：同一題比兩次</td><td>親眼看到關鍵字和 AI 的差別</td></tr>' +
          '<tr><td>05:40–06:00</td><td>回顧、明天預告</td><td>知道明天為什麼需要後台</td></tr>' +
          '</tbody></table></div>',
        extra: '午休與短休息另計，放在單元交界處。'
      },
      {
        title: '📋 課前準備（防呆清單）',
        body: '請在上課前完成，課前檢查時老師會陪你一起確認。',
        checklist: [
          '✅ 攜帶筆電與充電線（建議用自己的電腦，公司電腦常常不能安裝軟體）',
          '✅ 手機已安裝並登入 LINE，手機 LINE 已登記 Email 和密碼',
          '✅ 已建立自己的 LINE 官方帳號（課前檢查時老師陪你建立，<a href="../line-official-account-setup-guide.html#apply" target="_blank">申請步驟</a>）',
          '✅ 能用 Gmail 登入 Google AI Studio（aistudio.google.com）',
          '✅ 已訂閱 ChatGPT Plus，電腦已安裝 Codex 並登入',
          '✅ ChatGPT「設定 → 資料控管 → 為所有人改善模型」已關閉',
          '✅ 已用 Gmail 註冊 Cloudflare，並完成 Email 驗證',
          '✅ 想好 5 個「客人最常問我的問題」'
        ],
        extra: '⚠️ 忘記 Gmail 或 LINE 密碼，上課一定會卡住，請務必在課前處理。'
      },
      {
        title: '📖 專有名詞白話對照表',
        body: '這些術語今天會常常出現。不懂的時候回來查這張表就好，不用背。',
        glossary: true
      },
      {
        title: '🛠️ 卡關時怎麼辦？',
        body: '每個人的電腦都不一樣，遇到錯誤很正常。重點是你知道怎麼請 AI 幫忙。',
        debugSop: true
      }
    ]
  },
  {
    id: 'ai', label: '認識 AI', color: 's1',
    title: '上半場：AI 是什麼、可以幫我做什麼',
    desc: '把 AI 當成一位很聰明、但第一天來上班的新同事',
    steps: [
      {
        title: 'AI 可以幫你做的事',
        body: 'AI 最擅長的是處理「文字和資料」。下面每一項，今天都會實際做到一次：',
        checklist: [
          '寫：通知、信件、公告、客服回覆',
          '整理：把零散的訊息整理成清單、表格',
          '算：給 Excel 公式、幫你檢查數字（但要自己驗算）',
          '回答：根據你給的資料，回答客人的問題（下半場的 LINE 機器人）',
          '動手做：幫你操作電腦、建立系統（下半場的 Codex）'
        ]
      },
      {
        title: 'AI 不能做、或做不好的事',
        body: '知道 AI 的極限，才不會被它騙。',
        checklist: [
          'AI 不知道你公司的狀況，你沒說的它會「猜」',
          'AI 算數字會出錯，要交出去的數字一定要驗算',
          'AI 寫好一封信，不代表信已經寄出去了'
        ],
        tip: '💡 <strong>今天的觀念：</strong>AI 負責出主意、寫草稿；你負責交代清楚、檢查、做決定。'
      }
    ]
  },
  {
    id: 'collab', label: 'AI 協作三招', color: 's2',
    title: '上半場：AI 協作三招',
    desc: '交代清楚、來回修改、檢查錯誤。一招只練一件事。',
    steps: [
      {
        title: '情境：主管傳來一則 LINE',
        body: '你是公司的行政人員。主管在 <strong>11 月 3 日（星期二）早上</strong>傳了這段訊息給你：<br><br>' +
          '<div class="info-card info-card--blue">下禮拜五下午兩點要辦客戶說明會<br>大概30個人<br>報名表、通知客戶、簽到表這些幫我弄一下<br>地點我再跟你說<br>客戶名單在業務那邊</div>'
      },
      {
        title: '第一招：交代清楚',
        body: '先在 ChatGPT 輸入「<strong>幫我整理主管交代的事情</strong>」，看看它怎麼回答。接著按「新對話」，貼上下面這段完整的提示詞，比較兩次的差別。',
        promptBox: {
          id: 'collab_prompt_1',
          buttonText: '複製第一招提示詞',
          text: '【你的角色】\n你是一位細心的行政助理。\n\n【背景】\n主管在 11 月 3 日（星期二）傳來這段訊息：\n下禮拜五下午兩點要辦客戶說明會，大概30個人，\n報名表、通知客戶、簽到表這些幫我弄一下，\n地點我再跟你說，客戶名單在業務那邊。\n\n【請你完成】\n1. 一份活動籌備待辦清單（事項、負責人、期限、目前狀態）\n2. 一封給客戶的活動通知草稿\n3. 一份簽到表的欄位設計\n\n【限制】\n- 不知道的資訊請寫「待確認」，不要自己編造\n- 最後列出我需要問主管的問題'
        },
        checklist: [
          '比較兩次回答，哪一個可以直接拿去用？',
          '通知草稿的地點寫了什麼？AI 有沒有自己編地址？',
          'AI 說活動是幾月幾號？「下禮拜五」到底是哪一天，你確定嗎？'
        ],
        tip: '💡 <strong>交代清楚的四個格子：角色、背景、任務、限制。</strong>會用 AI 作圖的同學，是不是發現和寫作圖提示詞很像？'
      },
      {
        title: '第二招：來回修改',
        body: '在<strong>同一個對話</strong>裡繼續打字，不用重開。依序送出下面兩段：',
        promptBox: {
          id: 'collab_prompt_2',
          buttonText: '複製第二招提示詞',
          text: '客戶通知太正式了，我們的客戶大多是老客戶，\n請改成親切一點、像在 LINE 上傳訊息的口吻，100 字以內。\n\n（送出後，再送下面這段）\n\n在你幫我寫正式的報名表之前，\n請先問我 3 個你需要知道的問題，一次問一題。'
        },
        checklist: [
          'AI 記得前面在聊什麼，不用重新解釋背景',
          '回答 AI 的問題時，不知道的就說「還不知道」'
        ],
        tip: '💡 <strong>不滿意就直接說哪裡不好。</strong>「再好一點」沒有用，「太長了，改成 100 字」才有用。'
      },
      {
        title: '第三招：檢查它的錯',
        body: '主管又傳來：「<strong>客戶反應很好，人數改50人，預算一樣，總共15000，你看怎麼辦</strong>」<br><br>' +
          '<div class="glossary-table"><table><thead><tr><th>項目</th><th>單價</th><th>計算方式</th><th>30 人小計</th></tr></thead><tbody>' +
          '<tr><td>場地租借（最多容納 40 人）</td><td>4,000</td><td>固定</td><td>4,000</td></tr>' +
          '<tr><td>午餐便當</td><td>120</td><td>每人</td><td>3,600</td></tr>' +
          '<tr><td>飲料</td><td>30</td><td>每人</td><td>900</td></tr>' +
          '<tr><td>講義印刷</td><td>25</td><td>每人</td><td>750</td></tr>' +
          '<tr><td>伴手禮</td><td>100</td><td>每人</td><td>3,000</td></tr>' +
          '<tr><td>雜支（名牌、文具）</td><td>1,000</td><td>固定</td><td>1,000</td></tr>' +
          '<tr><td><strong>合計</strong></td><td></td><td></td><td><strong>13,250</strong></td></tr>' +
          '</tbody></table></div>補充：可容納 60 人的場地，租金是 6,000 元。',
        promptBox: {
          id: 'collab_prompt_3',
          buttonText: '複製第三招提示詞',
          text: '【背景】\n說明會人數從 30 人改為 50 人，總預算上限 15,000 元。\n原本的預算表如下：\n場地租借（最多容納 40 人）4,000 元，固定\n午餐便當 120 元，每人\n飲料 30 元，每人\n講義印刷 25 元，每人\n伴手禮 100 元，每人\n雜支 1,000 元，固定\n補充：原場地最多 40 人；可容納 60 人的場地租金 6,000 元。\n\n【請你完成】\n1. 50 人版本的預算表，標出超支多少\n2. 2～3 個刪減方案，每個方案寫出省多少錢、對活動的影響\n3. Excel 公式：小計、合計、和預算的差額\n4. 一段 150 字以內、給主管的預算說明\n\n【限制】\n- 只能使用我提供的價格，不要自己編造市價\n- 資訊不足的地方，列出要問主管的問題'
        },
        checklist: [
          'AI 算出的 50 人總額：自己用計算機或 Excel 驗算一次',
          'AI 有沒有注意到「場地只能坐 40 人」？',
          'AI 的刪減方案，減完真的低於 15,000 元嗎？',
          '方案裡的價格，是不是都來自上面的表？'
        ],
        tip: '💡 <strong>AI 負責想方案，Excel 負責算數字，你負責做決定。</strong>',
        extra: '加分題（有時間再做）：請 ChatGPT 做一張說明會邀請圖，上面寫「日期待公布、下午 2:00、地點待公布」。做完檢查圖上的字有沒有寫錯，或多出你沒說的內容。'
      }
    ]
  },
  {
    id: 'myfaq', label: '我的 FAQ', color: 's2',
    title: '上半場：我的真實任務，整理「我的 LINE 要回答的問題」',
    desc: '用剛學的三招，把你的服務資料整理成 FAQ。下半場會直接放進 LINE 機器人。',
    steps: [
      {
        title: '先看別人怎麼寫',
        body: '點一個<strong>和你不同主題</strong>的範例，看看資料要寫到多細。看懂以後，把欄位內容換成你自己的服務。',
        templateSelector: true,
        worksheet: {
          title: '我的服務資料',
          fields: [
            { id: 'my_theme', label: '我的服務是什麼？', type: 'text', hint: '例如：手作甜點小店，接受 LINE 預訂' },
            { id: 'my_info', label: '我知道的資料（一行一項，不確定的就寫「還沒確定」）', type: 'textarea', hint: '營業時間、付款方式、價格、交件時間……只寫你確定的事' }
          ]
        },
        tip: '💡 <strong>答案一定要是你確定的事。</strong>等一下機器人回答時，你才判斷得出它有沒有亂編。'
      },
      {
        title: '請 AI 幫你整理成 FAQ',
        body: '填完上面的欄位，下面的提示詞會自動更新。複製貼到 ChatGPT。',
        promptBox: {
          id: 'faq_ai_prompt',
          buttonText: '複製 FAQ 整理提示詞'
        },
        checklist: [
          '每一題的答案，都是我真的確定的事',
          'AI 沒有編出價格、日期、地址或優惠',
          '看過 AI 列出的「客人可能還會問的問題」，能補的就補進去'
        ]
      },
      {
        title: '把確認好的 FAQ 貼回這裡',
        body: '檢查、修改完以後，把最後的 FAQ 整段貼到下面。下半場部署機器人時會自動帶入，第二天也會用到。',
        worksheet: {
          title: '我的 FAQ（最終版）',
          fields: [
            { id: 'my_faq', label: '確認過的 FAQ', type: 'textarea', hint: '把 AI 整理、你檢查過的 FAQ 整段貼上' }
          ]
        },
        result: '成果：一份 5 題以上、你自己確認過的 FAQ'
      }
    ]
  },
  {
    id: 'line', label: 'LINE 官方帳號', color: 's3',
    title: '下半場：LINE 官方帳號，先做一個「沒有 AI 的機器人」',
    desc: '先用 LINE 內建的關鍵字自動回覆，再開通給自己的程式使用的 Messaging API',
    steps: [
      {
        title: '設定歡迎訊息與關鍵字自動回覆',
        image: '../line-flow-screenshots/05-official-account-dashboard-marked.png',
        body: '<div class="antifraud-notice">📣 <strong>防呆提示</strong>：講師會把每一步的連結發到 LINE 群組。請用 Chrome 開啟，不要用 LINE 內建瀏覽器。</div><br>' +
          '<strong>Step 1：</strong>開啟 <a href="https://manager.line.biz/" target="_blank" class="ext-link-btn">🔗 LINE Official Account Manager</a>，選擇課前建立好的官方帳號。<br><br>' +
          '<strong>Step 2：</strong>設定一則<strong>歡迎訊息</strong>，用你自己的服務名稱。<br><br>' +
          '<strong>Step 3：</strong>從你的 FAQ 挑一題，設定<strong>關鍵字自動回覆</strong>。例如關鍵字「營業時間」，回覆你的營業時間。<br><br>' +
          '<strong>Step 4：</strong>用手機傳「營業時間」給你的官方帳號，確認收到回覆。<br><br>' +
          '<strong>Step 5：</strong>改傳「<strong>你們幾點開門？</strong>」，看看會發生什麼事。',
        checklist: [
          '歡迎訊息已設定',
          '一則關鍵字自動回覆已設定',
          '手機傳關鍵字，收到回覆',
          '換一種問法，記下結果（等一下會再比一次）'
        ],
        tip: '💡 <strong>關鍵字自動回覆</strong>只認得你設定的字。客人換個說法，它就聽不懂了。這就是等一下要讓 AI 來幫忙的原因。'
      },
      {
        title: '開通 Messaging API，取得三把鑰匙',
        image: '../01_LINE三把鑰匙.png',
        body: '關鍵字回覆是 LINE 內建的功能。要讓<strong>我們自己的程式</strong>接收 LINE 訊息，要先開通 Messaging API。<br><br>' +
          '<strong>Step 1：</strong>OA Manager &rarr; 設定 &rarr; Messaging API &rarr; 啟用（第一次會請你建立 Provider，取一個名字就好）。<br><br>' +
          '<strong>Step 2：</strong>開啟 <a href="https://developers.line.biz/" target="_blank" class="ext-link-btn">🔗 LINE Developers</a>，找到剛剛啟用的 Channel。<br><br>' +
          '<strong>Step 3：</strong>取得以下資料，填進下方欄位：<br>' +
          '- <strong>Channel ID</strong>、<strong>Channel Secret</strong>：Basic settings 頁面<br>' +
          '- <strong>Your user ID（管理員 UID）</strong>：Basic settings 最下方，U 開頭的 33 碼（第二天的通知會用到）<br>' +
          '- <strong>Channel Access Token</strong>：Messaging API 分頁最下方 &rarr; Issue',
        checklist: [
          'Messaging API 已啟用',
          '已取得 Channel ID 與 Channel Secret',
          '已取得 Channel Access Token',
          '已取得管理員 UID'
        ],
        tip: '💡 <strong>三把鑰匙是什麼？</strong><br>1. <strong>Channel Secret</strong> 是「門禁密碼」：確認訊息真的來自 LINE<br>2. <strong>Access Token</strong> 是「發話遙控器」：讓程式可以回覆客人<br>3. <strong>Your user ID</strong> 是「老闆專屬信箱」：有事時通知你<br>等一下我們會把鑰匙交給 AI，讓它幫你把機器人接起來。',
        worksheet: {
          title: 'LINE 帳號資訊記錄（第二天會自動帶入）',
          hasCopyOutput: true,
          copyTargetId: 'line_credentials_copy',
          fields: [
            { id: 'line_channel_id', label: 'Channel ID', type: 'text', hint: '在 LINE Developers 的 Basic settings 中取得' },
            { id: 'line_channel_secret', label: 'Channel Secret', type: 'text', hint: '在 LINE Developers 的 Basic settings 中取得' },
            { id: 'line_admin_uid', label: '管理員 LINE UID', type: 'text', hint: 'Basic settings 最下方「Your user ID」，U 開頭的 33 碼' },
            { id: 'line_access_token', label: 'Access Token', type: 'textarea', hint: 'Messaging API 分頁最下方 Issue 取得的長效 Token' }
          ]
        }
      }
    ]
  },
  {
    id: 'flow', label: '訊息怎麼走', color: 's3',
    title: '下半場：LINE 訊息怎麼跑到程式裡？',
    desc: '不用背名詞，能用自己的話說出訊息走過哪四站就好',
    steps: [
      {
        title: '一則訊息的旅程',
        image: '../02_技術架構總覽.png',
        body: '客人在 LINE 問「你們幾點開門？」，這則訊息會這樣走：',
        flow: ['客人手機 LINE', 'LINE 平台按門鈴（Webhook）', 'Cloudflare Worker 帶上你的 FAQ', 'Gemini 根據 FAQ 回答', '回到客人手機'],
        tip: '💡 <strong>Webhook = 門鈴。</strong>客人在 LINE 敲你，LINE 就去按你程式的門鈴。門鈴的地址，就是等一下要填的 Webhook URL。'
      },
      {
        title: '和剛剛的關鍵字有什麼不同？',
        body: '剛剛的關鍵字自動回覆，是 LINE 拿著一張「固定答案表」比對字。接下來的 AI 機器人，是把客人的問題連同你的整份 FAQ 交給 AI，請它<strong>理解意思</strong>再組織回答。<br><br>' +
          'LINE 後台其實也有內建的 <strong>AI 聊天機器人（β）</strong>，但要加購「聊天進階方案」（每月 NT$100），今天不操作，看一下差別就好：<br>' +
          '<div class="glossary-table"><table><thead><tr><th></th><th>內建關鍵字</th><th>內建 AI 聊天機器人（β）</th><th>自己的 AI 機器人</th></tr></thead><tbody>' +
          '<tr><td>費用</td><td>免費</td><td>每月 NT$100（聊天進階方案）</td><td>Gemini、Cloudflare 免費額度內不用錢</td></tr>' +
          '<tr><td>怎麼回答</td><td>字要完全一樣才回</td><td>從你建的問答裡挑一題回</td><td>AI 讀完整份 FAQ，組織成回答</td></tr>' +
          '<tr><td>限制</td><td>換個說法就聽不懂</td><td>最多 100 題、每月有回覆上限；醫療、金融等業種可能不能用</td><td>要自己維護</td></tr>' +
          '<tr><td>接預約、後台、真人接手</td><td>不行</td><td>不行</td><td>可以（明天做）</td></tr>' +
          '</tbody></table></div>' +
          '只需要回答固定問題的店家，用內建的就夠了。我們自己做，是因為明天要讓 LINE 接預約、記住哪位客人正由真人服務，這些內建功能做不到。',
        checklist: [
          '說得出訊息走過哪四站',
          '知道 Webhook URL 要填在 LINE Developers，不是貼在聊天室',
          '知道 AI 只會根據你給的 FAQ 回答，不知道的就請客人找真人'
        ]
      }
    ]
  },
  {
    id: 'cloud', label: 'Cloudflare 與 Codex', color: 's4',
    title: '下半場：Cloudflare 與 Codex',
    desc: 'Cloudflare 是放機器人的地方，Codex 是幫你動手做的 AI',
    steps: [
      {
        title: '認識兩個新夥伴',
        body: '<strong>Cloudflare Worker</strong>：免費的雲端小主機，24 小時幫你守著 LINE 的門鈴。<br><br>' +
          '<strong>Codex</strong>：和 ChatGPT 是同一家的 AI，但它可以<strong>直接在你的電腦上操作</strong>：寫程式、安裝工具、部署上線。你負責說需求、按允許、驗收結果。',
        image: '../03_Cloudflare環境建置.png'
      },
      {
        title: '讓 Codex 連上你的 Cloudflare',
        body: '打開 Codex，貼上下面這句話：',
        promptBox: {
          id: 'cloud_login_prompt',
          buttonText: '複製登入提示詞',
          text: '我是零基礎學員。請幫我確認這台電腦能不能使用 Cloudflare 的 wrangler 工具：\n1. 檢查有沒有安裝 Node.js，沒有的話一步一步帶我安裝\n2. 執行 npx wrangler login，打開瀏覽器讓我登入 Cloudflare 並按允許\n3. 執行 npx wrangler whoami，告訴我登入的是哪個帳號\n每一步做完，用一句白話告訴我結果。'
        },
        checklist: [
          '瀏覽器跳出 Cloudflare 授權頁，已按「允許」',
          'Codex 回報的帳號 Email 是自己的 Gmail'
        ],
        extra: '⏱️ 課前檢查時已經跑過一次授權的話，這一步大約 5 分鐘。Windows 跳出「是否允許變更」時，請按「是」。'
      }
    ]
  },
  {
    id: 'deploy', label: '部署 FAQ 機器人', color: 's4',
    title: '下半場：請 AI 幫你部署 FAQ 機器人',
    desc: '申請 Gemini 鑰匙，把 FAQ 和鑰匙交給 Codex，讓它把機器人接上 LINE',
    steps: [
      {
        title: '申請 Gemini API Key',
        body: '開啟 <a href="https://aistudio.google.com/apikey" target="_blank" class="ext-link-btn">🔗 Google AI Studio</a> &rarr; 「Create API key」&rarr; 複製，貼到下方欄位。',
        worksheet: {
          title: 'Gemini 鑰匙（第二天會自動帶入）',
          fields: [
            { id: 'gemini_api_key', label: 'Gemini API Key', type: 'text', hint: 'AI Studio 建立的金鑰，AIza 開頭' }
          ]
        },
        tip: '💡 弄丟了也沒關係，回到 AI Studio 再建一把新的就好。'
      },
      {
        title: '把整合提示詞交給 Codex',
        body: '下面的提示詞已經自動放進你的 FAQ 和鑰匙，<strong>所有資料一次交給 Codex</strong>，它會從零寫出機器人程式並部署。請在剛剛登入 Cloudflare 的同一個 Codex 對話裡貼上，照它的指示按「允許」。',
        promptBox: {
          id: 'day1_build_prompt',
          buttonText: '複製部署提示詞'
        },
        checklist: [
          'Codex 回報部署成功，給了 Worker 網址',
          '打開「Worker 網址/health」看到 "status":"ok"'
        ],
        extra: '⏱️ 預估實作與排障時間：45 - 60 分鐘',
        worksheet: {
          title: '部署資訊記錄',
          fields: [
            { id: 'day1_worker_url', label: 'Worker 網址', type: 'text', hint: '例如：https://line-ai-faq.xxx.workers.dev' }
          ]
        }
      },
      {
        title: '把門鈴地址填進 LINE',
        body: '<strong>Step 1：</strong>LINE Developers &rarr; Messaging API 分頁 &rarr; Webhook URL 填入「<strong>Worker 網址/webhook/line</strong>」&rarr; Verify。<br><br>' +
          '<strong>Step 2：</strong>打開「Use webhook」。<br><br>' +
          '<strong>Step 3：</strong>回到 OA Manager &rarr; 回應設定，把「<strong>自動回應訊息</strong>」關閉。<br>' +
          '（不關的話，客人問一題，剛剛設定的關鍵字和 AI 會<strong>各回一次</strong>）',
        checklist: [
          'Webhook Verify 顯示 Success',
          'Use webhook 已開啟',
          '自動回應訊息已關閉'
        ]
      }
    ]
  },
  {
    id: 'verify', label: '驗收與回顧', color: 's5',
    title: '手機驗收：同一題比兩次',
    desc: '手機真的收到正確回答，才算完成',
    steps: [
      {
        title: '同一題，比兩次',
        body: '剛剛你用「你們幾點開門？」問過關鍵字機器人，它聽不懂。現在再問一次。',
        checklist: [
          '「你們幾點開門？」機器人答對了',
          '同一題換三種問法，答案的內容都一樣',
          '問一個 FAQ 沒有的問題（例如「有優惠嗎？」），機器人請你找真人，沒有亂編',
          '傳「人工」，機器人回覆會由真人處理'
        ],
        result: '🎉 你的 LINE 機器人聽得懂人話了！'
      },
      {
        title: '老師示範：真人接手時會發生什麼事？',
        body: '老師打開 OA Manager 的「聊天」，用真人身分回覆一位學員。這時學員再傳一句話，會看到<strong>真人和機器人同時回覆</strong>。<br><br>' +
          '機器人不知道真人已經在回了，因為它<strong>沒有記憶</strong>。明天我們會幫系統加上<strong>後台和資料庫</strong>，讓它記得「這位客人現在由真人負責」。',
        tip: '💡 <strong>這就是明天要學的：</strong>讓 LINE 不只會回答，還能記錄預約、記住客人狀態。'
      },
      {
        title: '今天的回顧',
        body: '每個人說一件今天和 AI 合作完成的事。',
        checklist: [
          '上午：我用三招，讓 AI 幫我完成一份工作',
          '上午：我用 AI 整理出自己的 FAQ',
          '下午：我請 Codex 幫我把機器人接上 LINE',
          '下午：我親眼看到關鍵字和 AI 的差別'
        ]
      }
    ]
  }
];
