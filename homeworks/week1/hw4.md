## 跟你朋友介紹 Git

### 什麼是 Git
* Git 是一種版本控制系統(Version Control System)

* 每次新增、刪除或修改檔案內容，都是一種版本，「版本控制」就是記錄這些所有狀態變化，讓以後可以隨時回到某個版本時候的狀態。

* Git 是一種==分散式版控系統(Distributed Version Control)==
軟體開發者可以共同參與一個軟體開發專案，但是不必在相同的網路系統下進行，且在沒有伺服器或網路的情況下仍可進行版控，待有網路時再與其他人同步。

* Git 像拍照(snapshot)一樣，在每次版本變化的時候，更新並記錄整個目錄跟檔案的樹狀結構。

### 為什麼要學 Git
* Git 優點
  1. 免費、開源
  2. 速度快、體積小：紀錄檔案內容的 snapshot ，可以快速切換版本。
  3. 分散式版控系統(Distributed Version Control)：在沒有伺服器或網路的情況下，仍可以使用。

* Git 缺點
  易學難精

### Git 指令
* **git init** 
    git 版本控制的起手式，在 terminal 輸入 git init，電腦就會開始對所在資料夾進行版本控制
* **git status** 
    確認本版控制狀態
* **git add 檔案名稱 & git rm --cached 檔案名稱**
    將檔案加入 & 取消版本控制
*  **git commit -m '檔案名稱'**
    新建一個版本
*  **git commit -am '檔案名稱'**
    git add + git commit 合併用法，將檔案加入版本控制並新建版本。
    (注意!此方法只適用於修改之前已經 add 過的檔案，若是新建的檔案必須先 add 再 commit)
* **git log**
   顯示 commit 的歷史紀錄

* **串連上述步驟**
    ```
    1. 建立一個資料夾
    2. $ git init --> 開始版本控制
    3. 在資料夾中新增幾個檔案
    4. $ git status --> 確認版本控制狀態
    5. $ git add --> 把需要版本控制的檔案加入 
    6. $ git commit --> 建立新版本
    7. $ git log --> 查看檔案修改歷史紀錄
    8. 修改資料夾中的某個檔案內容並儲存
    9. $ git status --> 查看版本控制狀態，會顯示步驟 8. 的資料夾被修改過，但尚未暫存，表示改變的版本還沒被加入版本控制中
    10. $ git add --> 將該檔案加入版本控制
    11. $ git status --> 確認該檔案已加入版本控制中
    12. $ git commit -m "" --> 正式將這次更改的內容新建一個版本
    13. $ git log --> 查看檔案修改歷史紀錄 

    ```
* **git checkout 版本號** 
  回到過去的版本
    ```
    $ git log --> 查看版本號並複製
    $ git checkout 版本號 --> 回到此版本的狀態
    $ git checkout master --> 回到主要分支（不一定是最新版本狀態）
    ```
    (GitHub 宣布從 2020 年 10 月 1 日起改變新 Git 儲存庫的預設命名，以 main 來取代原本的 master)
* **git diff**
  查看新舊版本差異
* **git remote -v**
  列出所有遠端程式庫的位址

### Branch
為什麼需要 Branch ?
因為如果整個專案的進度都在同一條線上的話不好管理，也很容易產生衝突，因此需要建立不同分支分別管理不同方向的調整，最後再整合起來。

* **git branch -v**
查看目前有哪些 branch
* **git branch 分支名稱**
新增 branch 
`$ git branch new-feature`
* **git checkout -b 分支名稱**
新建並切換到 branch 
`git checkout -b new-feature`
* **git branch -d 分支名稱**
刪除 branch 
`$ git branch -d new-feature`
* **git checkout 分支名稱**
切換到別的 branch 
`$ git checkout new-feature`
* **git merge 分支名稱**
合併 branch
`git merge new-feature` --> 把 new-feature 合併進來現在的分支
確認合併完成之後就可以刪除 branch `git branch -d new-feature`
* **解決衝突**
當兩個 branch 更改了同一個檔案，合併時會遇到 conflict (衝突)，此時只能用手動更改的方式，將想留下的內容儲存，並且 commit 為新的版本

### GitHub
* Git: 版本控制程式
* GitHub: 放 Git repository (專案的儲存庫)的地方

* 如何把 code 放上 GitHub?
  GitHub 首頁右上 **+** --> new repository --> 填寫資料送出 --> 按照指示將 command line 輸入到 terminal 中就可以了

* **git push**
  把電腦上更新的檔案同步到 GitHub 上

  * 若修改專案中的檔案
    ```
    1. 修改檔案
    2. 檔案 add 到版本控制中
    3. commit 新版本
    4. `$ git push origin master` 將檔案從 local(自己電腦)推到遠端(gitHub)
    5. github repository 同步完成
    ```
  * 若新增 branch
    ```
    1. `$ git branch 分支名稱` 新創一個 branch
    2. `$ git checkout 分支名稱` 切換到新的 branch
    3. 在此分支中新增或修改檔案之後 add 並 commit
    4. `$ git push origin 分支名稱`  將 local(自己電腦) 的 branch 推到遠端(gitHub)
    5. gitHub repository 同步完成
    ```    
    新增 branch 之後，可以直接在 GitHub 上 merge，只要按 pull request 就可以了。

* **git pull**
  把 GitHub 上的檔案同步到電腦上
  ```
  1. `$ git pull origin master`
  2.  gitHub repository 檔案下載完成
  3.  如果遇到 conflict 情況一樣手動解決，方法跟 merge branch 遇到衝突時一樣，commit 完記得 push 回去 GitHub。
  ```

* **git clone**
  下載 GitHub 上的 repository 
  ```
  1. 按 Clone or download (右上綠色按鍵)
  2. 直接 download zip ，或
  3. clone with SHH，複製 command line
  4. terminal 上打 `$ git clone 複製的內容`
  5. 成功將 repository 複製到電腦裡
  ```
 更改下載內容後可以 commit 到自己的電腦中，但沒有權限 push 回去 GitHub，因為這不是自己的 repository，若想要自己開一個專案修改，可以按右上角 fork 複製成自己的 repository，再照上述步驟就可以 push 回去。

