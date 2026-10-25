// DAY 1 教材資料：上半場 AI 協作，下半場 LINE 關鍵字機器人（內建關鍵字 → 自己的 AI）
// 欄位 id 與第二天共用（line_channel_secret 等），同一瀏覽器設定檔、同一網站網址第二天會自動帶入

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
  },
  massage: {
    label: '🌿 精油按摩',
    theme: '個人精油按摩工作室，採預約制，客人用 LINE 預約和詢問',
    info: '營業時間：週二到週日 11:00-21:00，週一公休，最後預約 19:30\n預約方式：LINE 預約，至少提前 1 天，當天有空檔才可臨時預約\n服務項目：全身精油按摩 90 分鐘 2200 元、120 分鐘 2800 元；肩頸背 60 分鐘 1500 元\n精油：有薰衣草、甜橙、尤加利三種可選，也可以不用精油\n改期取消：請在預約前 24 小時告知，可免費改期一次\n遲到：遲到會縮短服務時間，超過 20 分鐘視同取消\n不適合按摩：懷孕、發燒、剛喝酒、皮膚有傷口，請先告知\n付款：現金或轉帳，不能刷卡\n停車：附近有收費停車場\n男性客人：還沒確定要不要開放\n會員方案：還沒確定'
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
        images: [
          { src: './faq-flow-overview.svg', caption: 'DAY 1 成果：客人用自己的話問，AI 依照你的 FAQ 回答' },
          { src: '../line流程圖.png', caption: 'DAY 2 成果：客人點選單、看商品、按報名，名額自動扣減並通知老闆' }
        ],
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
          '<tr><td>03:10–03:30</td><td>LINE 訊息怎麼跑到程式裡（順便認識內建的 AI 聊天機器人）</td><td>能解釋 LINE、Worker、Google Gemini 與回覆的來回</td></tr>' +
          '<tr><td>03:30–04:00</td><td>Cloudflare 與 Codex、安裝 Cloudflare Skill</td><td>Codex 能登入 Cloudflare、看得到 skill</td></tr>' +
          '<tr><td>04:00–05:20</td><td>申請 Gemini 鑰匙 → 把所有資料交給 Codex，從零做出 FAQ 機器人 → 串接 Webhook</td><td>機器人上線</td></tr>' +
          '<tr><td>05:20–05:40</td><td>手機驗收：同一題比兩次</td><td>親眼看到關鍵字和 AI 的差別</td></tr>' +
          '<tr><td>05:40–06:00</td><td>回顧、明天預告</td><td>知道明天為什麼需要後台</td></tr>' +
          '</tbody></table></div>',
        extra: '午休與短休息另計，放在單元交界處。'
      },
      {
        title: '📦 下載教材包',
        body: '上課要用的練習檔（練習表、Excel、會議筆記、FAQ 素材、可複製提示詞）都在裡面。下載後在「下載」資料夾按右鍵 &rarr; 「解壓縮全部」，打開 <strong>START.html</strong> 開始。<br><br>' +
          '<a href="../downloads/第一天學員教材.zip" download class="ext-link-btn">⬇️ 下載第一天教材包</a> ' +
          '<a href="../downloads/兩天學員教材.zip" download class="ext-link-btn">⬇️ 下載兩天完整教材包</a>'
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
        tip: '💡 <strong>交代清楚的四個格子：角色、背景、任務、限制。</strong>用過 AI 作圖的話，會發現和寫作圖提示詞很像。'
      },
      {
        title: '第二招：來回修改',
        body: '在<strong>同一個對話</strong>裡繼續打字。先送這段，看到改寫結果後，再做下一步。',
        promptBox: {
          id: 'collab_prompt_2',
          buttonText: '複製 2-1：修改語氣',
          text: '客戶通知太正式了，我們的客戶大多是老客戶，\n請改成親切一點、像在 LINE 上傳訊息的口吻，100 字以內。'
        },
        checklist: [
          'AI 記得前面在聊什麼，不用重新解釋背景',
          '回答 AI 的問題時，不知道的就說「還不知道」'
        ],
        tip: '💡 <strong>不滿意就直接說哪裡不好。</strong>「再好一點」沒有用，「太長了，改成 100 字」才有用。'
      },
      {
        title: '第二招 2-2：讓 AI 先問清楚',
        body: '等上一段回覆完成，再送出這段。每次只回答一題；不知道就說「還不知道」。',
        promptBox: { id: 'collab_prompt_2_questions', buttonText: '複製 2-2：逐題追問', text: '在你幫我寫正式的報名表之前，請先問我 3 個你需要知道的問題，一次問一題，等我回答後再問下一題。資訊未確認前不要自行補上。' }
      },
      {
        title: '第三招：檢查與驗算',
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
        tip: '💡 <strong>AI 負責想方案，Excel 負責算數字，你負責做決定。</strong>若這次 AI 都答對，說明你核對了哪些原始資料，再檢查這個刻意錯誤範例：「50 人租 6,000 元場地，伴手禮改每份 40 元，其他不變，就在 15,000 元內。」不要為了找錯硬改正確答案。',
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
        body: '點一個範例，看看資料要寫到多細，再把欄位內容換成你自己的服務。想不到主題的話，<strong>直接用範例也可以</strong>，後面的流程完全一樣。',
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
        title: '申請 LINE 官方帳號',
        body: '還沒有官方帳號的人，先花幾分鐘申請一個：<br>' +
          '1. 用自己的 LINE 帳號登入 LINE Official Account Manager<br>' +
          '2. 左側選單按「建立」，填帳號名稱、電子郵件、業種等資料<br>' +
          '3. 確認條款後送出，就能在帳號列表看到自己的官方帳號<br><br>' +
          '每一步的畫面和注意事項，請看詳細教學：<br><br>' +
          '<a href="../line-official-account-setup-guide.html#apply" target="_blank" rel="noopener noreferrer" class="ext-link-btn">📘 LINE 官方帳號申請詳細教學 ↗</a>',
        checklist: [
          '能在 OA Manager 看到自己的官方帳號'
        ],
        tip: '💡 課前已經建好的人，這一步直接打勾跳過。'
      },
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
        title: '開通 Messaging API，取得 LINE 連線資料',
        image: '../01_LINE三把鑰匙.png',
        body: '關鍵字回覆是 LINE 內建的功能。要讓<strong>我們自己的程式</strong>接收 LINE 訊息，要先開通 Messaging API。<br><br>' +
          '<strong>Step 1：</strong>OA Manager &rarr; 設定 &rarr; Messaging API &rarr; 啟用（第一次會請你建立 Provider，取一個名字就好）。<br><br>' +
          '<strong>Step 2：</strong>開啟 <a href="https://developers.line.biz/" target="_blank" class="ext-link-btn">🔗 LINE Developers</a>，找到剛剛啟用的 Channel。<br><br>' +
          '<strong>Step 3：</strong>取得以下資料，填進下方欄位：<br>' +
          '- <strong>Channel ID</strong>、<strong>Channel Secret</strong>：Basic settings 頁面<br>' +
          '- <strong>Your user ID（管理員 UID）</strong>：Basic settings 最下方，U 開頭的 33 碼（第二天的通知會用到）<br>' +
          '- <strong>Channel Access Token</strong>：Messaging API 分頁最下方 &rarr; Issue<br><br>' +
          '<a href="../line-official-account-setup-guide.html#messaging-api" target="_blank" rel="noopener noreferrer" class="ext-link-btn">📘 Messaging API 開通詳細教學 ↗</a>',
        checklist: [
          'Messaging API 已啟用',
          '已取得 Channel ID 與 Channel Secret',
          '已取得 Channel Access Token',
          '已取得管理員 UID'
        ],
        tip: '💡 <strong>這三項 LINE 資料是什麼？</strong><br>1. <strong>Channel Secret</strong> 是「門禁密碼」：確認訊息真的來自 LINE<br>2. <strong>Access Token</strong> 是「發話遙控器」：讓程式可以回覆客人<br>3. <strong>Your user ID</strong> 是「老闆專屬信箱」：有事時通知你<br>User ID 是收件人識別碼，不是密碼。真正要保密並在課末更換的是 Channel Secret、Access Token，以及稍後的 Gemini API Key。',
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
    desc: '用 FAQ 情境認識 LINE、Webhook、Cloudflare Worker 與 Google Gemini API 的訊息來回',
    steps: [
      {
        title: '一則訊息的旅程',
        image: './faq-message-flow.webp',
        body: '客人在 LINE 問「星期日有營業嗎？」，LINE 會把訊息交給 Cloudflare Worker；Worker 先讀取已確認的完整 FAQ，再透過 <strong>Google Gemini API</strong> 送出「這位顧客的問題＋完整 FAQ＋只依 FAQ 回答的規則」。Google 回傳文字答案給 Worker，Worker 最後呼叫 <strong>LINE Reply API</strong> 把結果送回客人手機。若 FAQ 沒有相關資訊，應引導客人傳「人工」，不能亂猜。<br><br><strong>重點：</strong>Google 不會直接傳 LINE 訊息；向 Google 發問的是 Worker，Gemini API Key 安全放在 Worker Secret。',
        flow: ['① 顧客 LINE 提問', '② LINE Webhook', '③ Worker 讀取完整 FAQ', '④ Worker 詢問 Google Gemini API', '⑤ Google 傳回答案', '⑥ Worker 呼叫 LINE Reply API', '⑦ 顧客看到回覆'],
        tip: '💡 <strong>Webhook = 門鈴。</strong>LINE 把顧客問題通知 Worker，Worker 帶著 FAQ 去詢問 Google Gemini API。請沿著上方新版情境圖的編號說出訊息如何出去、又如何回來。'
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
          '能指出 Worker 如何透過 Gemini API 詢問，以及如何把答案送回 LINE',
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
        body: '先按下方按鈕，打開自己的 Cloudflare 後台確認已登入，再回到 Codex 貼上登入提示詞，讓 Wrangler 能使用你的 Cloudflare 帳號。<br><br><a href="https://dash.cloudflare.com/" target="_blank" rel="noopener noreferrer" class="ext-link-btn">開啟 Cloudflare 後台 ↗</a> <a href="https://developers.cloudflare.com/workers/wrangler/commands/general/#login" target="_blank" rel="noopener noreferrer" class="ext-link-btn">查看 Wrangler 登入教學 ↗</a><br><br>注意：開啟後台不等於 Codex 已連上，必須完成瀏覽器授權並以 <code>npx wrangler whoami</code> 確認。',
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
      },
      {
        title: '安裝 Cloudflare Skill（給 Codex 的操作手冊）',
        body: 'Skill 就像幫 Codex 裝一本「Cloudflare 操作手冊」，之後部署機器人、查錯誤時，它會照手冊的安全步驟做（先查看、跟你確認、再動手）。<br><br>' +
          '<strong>Step 1：</strong>開啟 <a href="https://drive.google.com/drive/u/0/folders/1GElvP2OY2pYHxTTBLERVxVUVeoRhlYi7" target="_blank" class="ext-link-btn">🔗 Cloudflare Skill 下載（Google 雲端硬碟）</a>，在 <strong>cloudflare</strong> 資料夾上按右鍵 &rarr; 「下載」。<br><br>' +
          '<strong>Step 2：</strong>下載下來會是一個壓縮檔，在「<strong>下載</strong>」資料夾裡按右鍵 &rarr; 「解壓縮全部」，確認裡面有 <strong>cloudflare</strong> 資料夾。<br><br>' +
          '<strong>Step 3：</strong>在 Codex 貼上下面這段話。',
        promptBox: {
          id: 'day1_skill_install_prompt',
          buttonText: '複製安裝提示詞',
          text: '老師給了我一個 Cloudflare 的 skill，資料夾名稱是 cloudflare，放在我電腦的「下載」資料夾裡（可能在解壓縮後的資料夾裡面）。\n請幫我安裝成「每個專案都能用」的 skill：\n1. 找到這個資料夾，確認裡面有 SKILL.md\n2. 把整個資料夾複製到我的使用者資料夾底下的 .agents/skills/cloudflare（資料夾不存在就建立）\n3. 告訴我安裝好了沒有，以及你現在看不看得到這個 skill；需要重開 Codex 才看得到的話，請直接告訴我\n請用繁體中文白話回答我。'
        },
        checklist: [
          'Codex 回報已安裝到 .agents/skills/cloudflare',
          '重開 Codex 後，問它「你有 cloudflare 這個 skill 嗎？」，它回答有'
        ],
        tip: '💡 裝在「使用者資料夾」而不是某一個專案裡，以後每個專案都用得到，第二天也不用再裝一次。'
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
        body: '先按「Google AI Studio」取得 Gemini API Key。這把金鑰提供給<strong>後端 Cloudflare Worker</strong> 使用，讓 Worker 可以向 Google Gemini API 詢問 FAQ。每次提問會把顧客問題與完整 FAQ 送到 Google，回覆再由 Worker 交回 LINE。<br><br><a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" class="ext-link-btn">開啟 Google AI Studio｜申請 API Key ↗</a> <a href="https://ai.google.dev/gemini-api/docs/api-key" target="_blank" rel="noopener noreferrer" class="ext-link-btn">Google 官方 API Key 教學 ↗</a><br><br>不要把實際金鑰放到 GitHub 或公開網頁。',
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
          'Codex 回報部署成功，/health 測試通過',
          'Codex 給了完整的 Webhook 網址（結尾是 /webhook/line）'
        ],
        extra: '⏱️ 預估實作與排障時間：45 - 60 分鐘'
      },
      {
        title: '把門鈴地址填進 LINE',
        body: '<strong>Step 1：</strong>LINE Developers &rarr; Messaging API 分頁 &rarr; Webhook URL 貼上<strong>Codex 給你的 Webhook 網址</strong> &rarr; Verify。<br><br>' +
          '<strong>Step 2：</strong>打開「Use webhook」。<br><br>' +
          '<strong>Step 3：</strong>回到 OA Manager &rarr; 回應設定，把「<strong>自動回應訊息</strong>」關閉。<br>' +
          '（不關的話，客人問一題，剛剛設定的關鍵字和 AI 會<strong>各回一次</strong>）<br><br>' +
          '<strong>Step 4：</strong>同一頁確認「<strong>聊天</strong>」是<strong>開啟</strong>的。<br>' +
          '（關掉的話，OA Manager 的聊天室看不到客人的訊息，真人就沒辦法接手）',
        checklist: [
          'Webhook Verify 顯示 Success',
          'Use webhook 已開啟',
          '自動回應訊息已關閉',
          '聊天保持開啟'
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
          '傳「人工」，機器人回覆「真人客服會回覆您」，電腦上 OA Manager 的聊天室也看得到這則訊息'
        ],
        extra: '⚠️ 一直收到「請傳人工」，可能是 FAQ 缺資料，也可能是 API 失敗。請老師查看錯誤：429 要區分每分鐘與每日額度；每日額度不是等一分鐘就恢復。不要連續重送，先記錄問題。',
        result: '🎉 你的 LINE 機器人聽得懂人話了！'
      },
      {
        title: '自己試試：真人接手時會發生什麼事？',
        body: '用電腦打開你的 OA Manager &rarr;「聊天」，找到你手機的對話，用<strong>真人身分</strong>回覆一句。接著用手機再問一個問題，會看到<strong>真人和機器人同時回覆</strong>。<br><br>' +
          '機器人不知道真人已經在回了，因為它<strong>沒有記憶</strong>。明天我們會幫系統加上<strong>後台和資料庫</strong>，讓它記得「這位客人現在由真人負責」。',
        tip: '💡 <strong>這就是明天要學的：</strong>上午先幫機器人加上後台，讓它記得「這位客人現在由真人負責」，你也能在網頁上直接改 FAQ、看到 AI 答不出來的問題；下午再加上預約或賣商品。'
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
