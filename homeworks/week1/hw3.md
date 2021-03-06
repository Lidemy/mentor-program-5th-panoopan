## 教你朋友 CLI

### 什麼是 Command line 
* Command line = 命令列 = 用純文字對電腦下指令的方法
* 跟電腦溝通的方式主要分為兩種: **GUI** 和 **CLI**
    * **GUI** (Graphical User Interface): 圖形使用者介面
    * **CLI** (Command Line Interface): 命令列介面

### 為什麼要學 Command line
相較於 GUI 而言，用 CLI 與電腦溝通比較快速，而且有很多程式工具沒有提供視窗介面，只能用 CLI 下指令

### 如何使用 Command line
* Mac: 終端機 Terminal.app
* Windows: 命令提示字元 cmd.exe

### 基本 & 常用指令 (Terminal)

* **pwd** (Print Working Directory) : 印出現在在哪裡
* **ls** (List Segment) : 列出所有檔案
    * **ls -l** : 列出詳細資料
    * **ls -a** : 列出隱藏檔案
    * **ls -al** : 列出隱藏目錄 + 詳細資料
* **cd** (Change Directory) : 切換資料夾
    * **cd ..** : 回到上一層
    * **cd ~** : 家目錄，回到點腦預設的起點位置
    * **cd /** : 根目錄
* **Clear** : 清空 Terminal 面板
* **Touch** 
    1. 建立檔案（若 touch 不存在的檔案 = 建立一個檔案）
    2. 碰一下檔案（用ls -l 觀察檔案最後編輯時間變化）
  
* **mkdir** (Make DIRectory) : 建立資料夾，後面接要命名的檔名
* **rm** (ReMove) :  刪除檔案
    * **rmdir** (ReMove DIRectory) : 刪除資料夾(當刪除的檔名帶有空格或特殊字元時可使用單引號將檔名括起來)
    * **rm -rf**：若資料夾中有檔案則無法用 rmdir 移除，需用 rm -r
* **cp** (CoPy) : 複製檔案
  cp + 要複製的檔案名稱 + 新的檔案名稱
    * **cp -r** : 複製資料夾
      cp -r + 要複製的資料夾名稱 + 新的資料夾名稱
* **MV**(MoVe) :
  1. 移動檔案:
  MV 要移動的檔案名稱 移動至哪個資料夾
  2. 重新命名檔案:
  MV 要移動的檔案名稱 新的檔案名稱
* **MAN**(MANual) : 使用說明書
  MAN + 指令名稱，列出相關的指令介紹及延伸用法，按 q 離開介面
* **Date** : 印出現在時間
* **TOP**(Table Of Processes) : 
  印出所有processes 看一些跟電腦有關的功能 ，按 q 離開介面
* **CAT**(CATenate) : 連接或顯示檔案內容
* **Less** : 分頁式印出檔案
  Less + 檔案名稱，按 q 離開介面
* **Grep** : 抓取特定關鍵字
  Grep + 關鍵字 + 檔案名稱
* **Echo** : 印出字串
* **|** (Pipe) : 串接指令，把前面的輸出變成後面的輸入。
  Ex: cat file.txt | grep hi
* **>** (Redirection) : 重新導向 input output
  要 input 的內容 + > + 要 output 的檔案
  Ex: echo hello > file.txt，再用 cat file.txt 確認內容是否已輸入。若重新輸入 echo 123 > file.txt，會發現 hello 被 123 覆蓋了，若只是要新增內容，則要使用 echo 123 **>>** file.txt 
* **WGET** : 下載檔案
  wget + 網址，下載後會出現檔案名稱，用 cat + 檔名，顯示內容。
  Ex: wget google.com --> cat index.html --> grep google   index.html
* **CURL** : 送出 request
  curl + API 網址，送出 request，列出 response
  curl -I + 網址，列出相關資訊
* **Exit** : 離開 Terminal
* **Vim** 
vim 是文字檔案編輯器，可以直接在 Terminal 輸入 vim，會出現文字編輯視窗。
輸入 vim + 檔案名稱，可直接編輯檔案內容。要編輯時按 i、a、o 任一鍵，就可以開始輸入文字。要離開編輯模式時，按 esc 鍵或 ctrl+c。在一般模式下，輸入 :w 存檔，:q 離開，:wq 存檔然後離開。

### 實戰練習
> 用 command line 建立一個叫做 wifi 的資料夾，並且在裡面建立一個叫 afu.js 的檔案

1. 打開 terminal
2. `pwd` ：確認自己的位置
3. `mkdir wifi` ： 建立資料夾 wifi
4. `cd wifi` ： 切換到 wifi 資料夾內
5. `touch afu.js` ： 建立檔案 afu.js
6. `ls` ：列出檔案，確認檔案是否新增成功

