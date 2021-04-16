## 交作業流程

### 寫作業
1. 透過課程連結將 GitHub 上的 Lidemy/mentor-program-5th-panoopan clone 到電腦裡
    * 複製 gitHub repo 上的網址
    * 開啟電腦中的資料夾，並開啟此位置的終端機視窗
    * `$ git clone 網址` 
2. 新開一個 branch(Ex:`$ git branch week1`) 並 checkout 到這個 branch 中(Ex:`$ git checkout week1`) 
(或是：`$ git checkout -b week1` = 創造一個 branch 並切換)
3. 進入 mentor-program-5th-panoopan 中的 homeworks 資料夾
4. 開始將作業寫在指定的檔案中
5. 寫完後記得將修改過的檔案 add 加入版本控制(`$ git add 檔名`)
6. commit 新建一個版本(`$ git commit -m "新建版本名稱" `)
**==一定要在新開的 branch 中寫作業！！！！==**

### 交作業
**==一週的作業要每個都寫好再一起發 PR！！！！==**
1. 寫完當週全部作業
2. 交作業前要先看當週「自我檢測」
3. `$ git push origin 分支名稱` 將 local(自己電腦) 的 branch 推到遠端(GitHub)去（需輸入 github 的 username 及密碼）
4. 在 GitHub Lidemy/mentor-program-5th-panoopan 頁面上到 “pull requests”按 Compare & pull request(如果沒出現就按 New pull request)
5. 往下滑檢視更新的內容與要繳交的作業內容相符，確認後打主旨與內容，按 Create pull request (PR)，並複製此網頁之網址
6. 發完 PR 務必點到 files chaneged 查看繳交內容
7. 到學習系統上的『課程總覽』選週次，按『繳交作業』，選擇第幾週並勾選問題
8. 複製 PR 連結（第 5. 步驟按 Create pull request 之後的網頁畫面），並貼上送出作業
9. 確認『作業列表』有顯示作業
10. 助教 merge 之前如果作業內容有更動，commit 完之後 push 就好，PR會自動更新
11. 等待助教改完作業，會將遠端的 branch merge 到遠端的 master
12. 到 “pull requests”頁面確認 branch 已顯示  merged，表示作業改完了
13. 開啟終端機`$ git checkout master`在 local 切換到 master 
14. `$ git pull origin master`把 local 的 master 與遠端的 master 同步
15. `$ git branch -d 分支名稱`把 local 的 branch 刪除
16.  作業已經改完後如果還要修正，就自己發 PR 自己 merge 就好，不需要再繳一次作業
17.  教完作業記得看「參考範例」精進改善空間

### 與我的 master 同步
1. 在 mentor-program-5th-panoopan 資料夾 checkout 到 master
2. `$ git status` 確認沒有進行中的東西
3. 到 GitHub mentor-program-5th 按 clone 複製網址
4. `$ git pull 網址 master`把新的改動拉下來
5. :wq 離開 vim 視窗
6. `$ git push origin master`與遠端(mentor-program-5th-panoopan)的 master 同步