## 部署
這次的部署作業我是選擇在 AWS 買主機，部署方法參考 [Amazon EC2 官方文件](https://docs.aws.amazon.com/zh_tw/AWSEC2/latest/UserGuide/concepts.html)

文件內容寫的蠻清楚的，基本設定、啟動 instance、連線、安裝 LAMP 的步驟都是照文件操作就能完成。第一次操作的時候因為還不瞭解每個步驟在做什麼，再加上 AMI 是選擇 Amazon Linux 2，在設定上跟 Ubuntu 有些不同(學長姐的攻略都是選擇 Ubuntu)，所以遇到問題就乖乖認命去查資料。這個階段遇到的問題是跟防火牆有關，但是只要照文件設定好 security groups 就可以成功連線，之後有再嘗試從頭開始操作一次流程，比較能理解每個步驟的作用，其中設定 apache 群組的部分還是看不太懂

連上主機之後，先嘗試用 CLI 在指定的資料夾中新增 php 檔案，測試是否能在網頁上呈現。接下來就是將之前的作業上傳到主機，一開始上傳的時候是先在虛擬主機上安裝 git，用 git clone 的方式把 GitHub 上 repo 的檔案放到虛擬主機上，但是這個方法還要手動把 conn.php 上傳到主機實在太麻煩。後來想到交作業時都是用 FileZilla 把檔案拉到遠端主機上，所以查到用 key-pairs 登入 AWS EC2 存取檔案的方法，成功將檔案上傳，並且也在 phpMyAdmin 設定匯入 database，之前作業就成功在虛擬主機的 IP 上跑起來了！

最後是購買網域的部分，到 gandi 購買網域名稱，並與虛擬主機連線。設定 CNAME 的部分是卡關最久的，查了很多資料都是要更改 Virtual Host 的檔案設定，但是進入指定檔案之後一直沒有找到符合的敘述，嘗試了無數次之後終於找到正確的設定方法，存檔之後在 gandi 新增 CNAME 才順利成功。

其實官方的文件還有一個設定 SSL/TLS 的教學，如果要用 https 瀏覽網址就必須完成這個步驟，否則上述的設定只能使用 http，有安全疑慮。除了要設定 security groups 之外，還要在伺服器上啟用 TLS，並且取得 CA 簽署的憑證。這部分我嘗試操作之後，雖然能夠成功啟用 TLS，但是查到取得 CA 簽署憑證的方法都是要額外付費的，所以就沒有繼續設定下去。停在這個步驟的話 https 瀏覽也無法成功，會跳出『您的連線不是私人連線』警告，這部分算是設定失敗的

總結這次的部署經驗，之前看了學長姊的心得之後，就有心理準備這週會遇到很多問題，實際經歷之後也感受到了這水有多深，很多更底層的概念非常抽象難懂。不過，試著靠自己查資料解決問題的過程，對我的學習心態上有很大的幫助，比起計畫一開始的時候，現在的我在遇到問題的時候不會再那麼抗拒，能夠靜下心來好好讀文件、查資料，把大問題拆解成小問題一一解決，這是我在這個作業上獲得的收穫

## Reference
* [Amazon EC2](https://docs.aws.amazon.com/zh_tw/AWSEC2/latest/UserGuide/concepts.html)
* [How to Set Up an EC2 Virtual Server in AWS](https://www.taniarascia.com/getting-started-with-aws-setting-up-a-virtual-server/)
* [How to Host a Static Website on AWS ](https://medium.com/coder-life/how-to-build-a-website-by-using-aws-e3a5befac4de)
* [[AWS] 透過 FileZilla 使用 key-pairs 登入 AWS EC2 存取檔案](http://www.jysblog.com/coding/web/aws-%E9%80%8F%E9%81%8E-filezilla-%E4%BD%BF%E7%94%A8-key-pairs-%E7%99%BB%E5%85%A5-aws-ec2-%E5%AD%98%E5%8F%96%E6%AA%94%E6%A1%88/)
* [[day20]-假日分享系列之「AWS EC2架站之Virtual Host設定子網域」](https://ithelp.ithome.com.tw/articles/10207988)
* [AWS EC2 部署網站：卡關記錄 & 心得](https://nicolakacha.coderbridge.io/2020/09/16/launch-website/)
* [[ 紀錄 ] 部屬 AWS EC2 雲端主機 + LAMP Server + phpMyAdmin](https://mtr04-note.coderbridge.io/2020/09/15/-%E7%B4%80%E9%8C%84-%08-%E9%83%A8%E5%B1%AC-aws-ec2-%E9%9B%B2%E7%AB%AF%E4%B8%BB%E6%A9%9F-/)