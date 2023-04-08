// 获取 fa-icon span 元素
const faIcon = document.querySelector('#fa-icon');
// 定义图标数组和当前图标索引
const icons = ['fab fa-github','fab fa-bilibili','fab fa-alipay','fab fa-android','fab fa-apple','fab fa-app-store-ios','fab fa-bluetooth','fab fa-btc','fab fa-buffer','fab fa-cc-amazon-pay','fab fa-chrome','fab fa-discord','fab fa-edge-legacy','fab fa-ethereum','fab fa-facebook','fab fa-flickr','fab fa-gitlab','fab fa-google','fab fa-internet-explorer','fab fa-linux','fab fa-php','fab fa-playstation','fab fa-python','fab fa-qq','fab fa-raspberry-pi','fab fa-react','fab fa-steam','fab fa-tiktok','fab fa-twitch','fab fa-twitter','fab fa-ubuntu','fab fa-unity','fab fa-windows','fab fa-xbox','fab fa-youtube','fab fa-zhihu','fab fa-yelp'];
let index = 0;

// 定义循环函数
function loop() {
  // 切换到下一个图标
  index = (index + 1) % icons.length;
  // 将当前图标缩小并透明度降低，等待渐变完成
  faIcon.style.transform = 'scale(0.3)';
  faIcon.style.opacity = '0.1';
  setTimeout(() => {
    // 设置当前图标类名
    index = Math.floor(Math.random() * icons.length);
    faIcon.className = `fas ${icons[index]}`;
    // 将当前图标放大，完成渐变
    faIcon.style.transform = 'scale(1)';
    faIcon.style.opacity = '1';
  }, 500);
  // 循环执行
  setTimeout(loop, 2000);
}

// 开始执行循环
loop();