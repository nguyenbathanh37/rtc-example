// Khởi tạo Socket.IO client
const socket = io();

// Lấy tên của mình và tên phòng từ trang HTML
const name = document.getElementById('name').value;
const room = document.getElementById('room').value;

// Khi nút "Join" được nhấn, gửi sự kiện "join-room" đến server
document.getElementById('join-button').addEventListener('click', () => {
  socket.emit('join-room', { name, room });
});

// Khi một người dùng khác tham gia vào phòng của mình, hiển thị thông báo và hiển thị nút "Call"
socket.on('user-connected', (userId) => {
  console.log('User connected:', userId);
  document.getElementById('call-button').disabled = false;
});

// Khi nút "Call" được nhấn, gửi sự kiện "call-user" đến server
document.getElementById('call-button').addEventListener('click', () => {
  socket.emit('call-user');
});

// Khi một người dùng khác gọi tới, hiển thị thông báo và hiển thị nút "End Call"
socket.on('call-made', (data) => {
  console.log('Call made by:', data.socket);
  document.getElementById('end-call-button').disabled = false;
});

// Khi nút "End Call" được nhấn, gửi sự kiện "end-call" đến server
document.getElementById('end-call-button').addEventListener('click', () => {
  socket.emit('end-call');
});

// Thêm video stream vào trang HTML
function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener('loadedmetadata', () => {
    video.play();
  });
  document.getElementById('videos').append(video);
}

// Khi nhận được video stream từ một người dùng khác, thêm video stream đó vào trang HTML
socket.on('add-stream', (stream) => {
  const video = document.createElement('video');
  video.setAttribute('autoplay', '');
  video.setAttribute('muted', '');
  addVideoStream(video, stream);
});
