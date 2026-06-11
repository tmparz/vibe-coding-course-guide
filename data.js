const STAGES = [
  {
    id: "overview", label: "課程總覽", color: "s1",
    title: "Vibe Coding 手把手實戰班",
    desc: "用 LINE OA 打造你的第一套預約系統 MVP - 6 小時完成從零到上線",
    steps: [
      { title: "課程目標", body: "學員在 6 小時內完成一套可運作的 LINE OA 預約系統 MVP。真正想教的能力：如何把商業需求拆解成系統需求，並透過 AI 完成系統建置。",
        image: "line流程圖.png",
        checklist: ["LINE OA 串接","商品管理","訂單管理","LINE Webhook","Cloudflare Worker","D1 Database","Rich Menu","LINE 通知","MVP 上線"] },
      { title: "適合對象", body: "已有 LINE OA 經營需求的工作者",
        checklist: ["美甲師 / 顧問 / 教練","講師 / 塔羅老師","接案工作者"],
        extra: "必須符合：願意自己動手做、願意使用 AI、系統建置在 LINE OA 上" },
      { title: "課前準備", body: "請確認以下設備與帳號已準備就緒",
        checklist: ["攜帶筆電","AI 工具帳號（Claude Code / Codex / Antigravity 等，有付費為佳）"] },
      { title: "技術架構總覽", body: "整個系統的資料流如下：",
        flow: ["LINE OA","Messaging API","Webhook","Cloudflare Worker","D1 Database"],
        techs: ["LINE OA","Cloudflare Worker","D1 Database","Webhook","Rich Menu"] }
    ]
  },
  {
    id: "morning1", label: "Ch1-2 成果與生態", color: "s1",
    title: "上午前半：成果展示與 LINE 生態系統",
    desc: "了解今天要完成什麼，以及 LINE 開發者生態系統的核心概念",
    steps: [
      { title: "Ch1 - 課程成果展示", body: "講師展示今天課程結束後學員將完成 the MVP 系統，包含完整的預約流程。",
        checklist: ["了解 MVP 最終樣貌","理解 MVP 範圍（包含與不包含）"] },
      { title: "MVP 範圍確認", body: "明確界定本次課程的實作範圍",
        checklist: ["包含：商品管理、商品上下架、商品名額","包含：訂單管理、Webhook、Rich Menu","包含：LINE 通知、Cloudflare 部署","不包含：金流、CRM、會員系統","不包含：Google Calendar、自動排課、LIFF、多角色權限"] },
      { title: "Ch2 - LINE 生態系統", body: "認識 LINE 開發者平台的各個組成元件，並填寫下方憑證資訊以供後續生成 AI 提示詞。",
        checklist: ["LINE OA（LINE Official Account）","LINE Developers 平台","取得 Channel ID","取得 Channel Secret","取得 Access Token"],
        result: "成果：取得 Access Token 和 Channel Secret",
        worksheet: {
          title: "LINE 帳號資訊記錄 (填寫後可在下方直接複製)",
          hasCopyOutput: true,
          copyTargetId: "line_credentials_copy",
          fields: [
            { id: "line_channel_id", label: "Channel ID (必填)", type: "text", hint: "在 LINE Developers 的 Channel settings 中取得" },
            { id: "line_channel_secret", label: "Channel Secret (必填)", type: "text", hint: "在 LINE Developers 的 Channel settings 中取得" },
            { id: "line_access_token", label: "Access Token (必填)", type: "textarea", hint: "在 Messaging API tab 最下方 Issue 取得的長效 Token" }
          ]
        }
      }
    ]
  },
  {
    id: "morning2", label: "Ch3-5 資料流與設定", color: "s2",
    title: "上午後半：資料流、環境建置與系統設定",
    desc: "理解 LINE 訊息如何流動，並完成 Cloudflare 環境建置與預約系統設定",
    steps: [
      { title: "Ch3 - LINE 資料流", body: "理解使用者從 LINE 發送訊息到系統回應的完整資料流",
        flow: ["使用者","LINE OA","Webhook","Cloudflare","Database","通知"] },
      { title: "Ch4 - Cloudflare 環境建置", body: "第二大點：Cloud 環境建置",
        checklist: ["使用 Gmail 快速註冊並登入 Cloudflare 帳號"] },
      { title: "Ch5 - 建立預約系統欄位規格", body: "定義預約系統商品表與訂單表的欄位結構（後台將提供商品上架與訂單管理，此處僅定義規格結構，無需寫死資料內容）",
        worksheet: {
          title: "資料表規格與通知範本定義",
          fields: [
            { id: "product_fields", label: "商品表欄位 (請以逗號分隔)", type: "text", hint: "例如：商品名稱, 價格, 上下架狀態, 上架時間, 下架時間, 名額" },
            { id: "order_fields", label: "訂單表欄位 (請以逗號分隔)", type: "text", hint: "例如：姓名, 電話, 預約時段, 付款狀態" },
            { id: "admin_notify_tpl", label: "管理員通知內容範本", type: "textarea", hint: "例如：系統提示：學員 [姓名] 已登記！[時段: [時段]]，剩餘名額: [名額]。" },
            { id: "user_notify_tpl", label: "客戶通知內容範本", type: "textarea", hint: "例如：[姓名] 您好，預約成功！單號: [單號]。系統已自動扣減名額。" }
          ]
        }
      }
    ]
  },
  {
    id: "afternoon1", label: "Step 1-4 建置核心", color: "s3",
    title: "下午實作前段：整合提示詞與核心系統",
    desc: "使用彙整後的提示詞引導 AI 建立商品與訂單核心系統",
    steps: [
      { 
        title: "Step 1 - 匯整系統提示詞", 
        body: "整合前面步驟填寫的 LINE 憑證與欄位規格設定，自動彙整為一頁完整的 AI 指引 Prompt。您將使用此 Prompt 搭配 Cloudflare Skill 引導 AI 進行開發。",
        promptBox: {
          id: "system_prompt_output",
          buttonText: "複製 AI 開發提示詞"
        }
      },
      { title: "Step 2 - 建立商品與訂單管理系統", body: "使用 AI 協作完成商品管理與訂單的核心功能，包含新增、修改、上下架與狀態異動。",
        checklist: ["商品新增與修改功能","商品上下架狀態切換","訂單建立與查詢功能","訂單狀態修改（確認/取消）"] },
      { title: "Step 3 - 本地資料庫連接與測試", body: "在本地環境模擬連接 D1 資料庫，確認商品與訂單的核心功能完全正常。",
        checklist: ["執行 npx wrangler d1 execute vibe-booking-db --local --file=schema.sql 初始化","啟動本地開發伺服器 npm run dev","確認本地 CRUD 測試通過"] }
    ]
  },
  {
    id: "afternoon2", label: "Step 5-10 部署上線", color: "s4",
    title: "下午實作後段：資料庫、部署與串接",
    desc: "連接 D1 Database、部署到 Cloudflare、串接 LINE Webhook，完成 Rich Menu 與預約流程",
    steps: [
      { title: "Step 5 - 建立 Cloudflare D1", body: "在 Cloudflare 上建立 D1 資料庫",
        checklist: ["建立 D1 Database","取得 Database ID","設定 wrangler.toml 綁定"],
        worksheet: {
          title: "D1 資料庫資訊",
          fields: [
            { id: "cloudflare_db_name", label: "Database 名稱", type: "text", hint: "例如：vibe-booking-db" },
            { id: "cloudflare_db_id", label: "Database ID", type: "text", hint: "建立後取得的 UUID" }
          ]
        }
      },
      { title: "Step 6 - 接上 D1 Database", body: "將本地測試通過的系統連接到雲端 D1 資料庫",
        checklist: ["修改程式碼連接 D1","確認資料可正常寫入","確認資料可正常讀取"] },
      { title: "Step 7 - 部署到 Cloudflare Worker", body: "將系統部署到雲端，取得正式的 Worker URL",
        checklist: ["執行 wrangler deploy","確認部署成功","記錄 Worker URL"],
        result: "成果：取得 Worker URL",
        worksheet: {
          title: "部署資訊記錄",
          fields: [
            { id: "cloudflare_worker_url", label: "Worker URL", type: "text", hint: "例如：https://my-booking.xxx.workers.dev" }
          ]
        }
      },
      { title: "Step 8 - LINE Webhook 串接", body: "將 LINE OA 與你的 Worker 系統連接起來",
        checklist: ["設定 Webhook URL","回填 Access Token","回填 Channel Secret","Webhook 驗證通過"] },
      { 
        title: "Step 9 - 建立 Rich Menu", 
        body: "設計並建立 LINE 官方帳號的圖文選單。為了確保選單圖片與點擊邏輯精準對應，請複製下方的 AI 產圖提示詞，至 Midjourney / DALL-E 等生圖工具產生選單底圖，隨後上傳至 LINE OA。",
        promptBox: {
          id: "rich_menu_image_prompt",
          buttonText: "複製選單產圖提示詞"
        }
      },
      { title: "Step 10 - 預約流程打通", body: "完成端到端的預約流程測試",
        flow: ["點選預約","查看商品","建立訂單","寫入資料庫","通知管理員","通知客戶"],
        result: "預約流程完整打通" }
    ]
  },
  {
    id: "verify", label: "驗收", color: "s5",
    title: "驗收標準與完成確認",
    desc: "逐一確認所有功能是否正常運作，確保帶走一個可運作的 MVP",
    steps: [
      { title: "功能驗收清單", body: "請逐一測試以下功能並打勾確認",
        checklist: ["商品新增成功","商品顯示成功","訂單建立成功","Webhook 正常運作","Rich Menu 正常顯示","管理員收到通知","客戶收到通知"],
        result: "全部通過 = MVP 完成" },
      { title: "備援方案", body: "若學員實作遇到困難，講師提供 Demo 專案作為備援，確保學員至少能部署成功並帶作品回家。",
        checklist: ["取得講師 Demo 專案","部署 Demo 專案到自己的 Cloudflare","串接自己的 LINE OA"],
        result: "確保每位學員都能帶走可運作的系統" },
      { title: "課後資源", body: "課程結束後的延伸學習方向",
        checklist: ["加入學員交流群組","取得課程教材與文件","了解進階功能擴充方向（金流、CRM、LIFF 等）"] }
    ]
  }
];
