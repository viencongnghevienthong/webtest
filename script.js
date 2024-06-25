// Tạo một ID duy nhất cho người dùng nếu chưa có
function getUserId() {
    let userId = localStorage.getItem('userId');
    if (!userId) {
        userId = 'user-' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('userId', userId);
    }
    return userId;
}

// Lưu thông tin đỗ xe
function saveParkingPosition(supermarket, floor, area) {
    const currentTime = new Date();
    const userId = getUserId();
    localStorage.setItem(userId + '-supermarket', supermarket);
    localStorage.setItem(userId + '-floor', floor);
    localStorage.setItem(userId + '-area', area);
    localStorage.setItem(userId + '-parkingTime', currentTime.toString());
}

// Lưu thông tin cửa vào
function saveEntranceInfo(entrance) {
    const userId = getUserId();
    localStorage.setItem(userId + '-entrance', entrance);
}

// Lấy tham số từ URL
function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Hiển thị thông tin đỗ xe
function displayParkingInfo() {
    const supermarket = getQueryParameter('supermarket');
    const floor = getQueryParameter('floor');
    const area = getQueryParameter('area');

    if (supermarket && floor && area) {
        const userId = getUserId();
        const existingSupermarket = localStorage.getItem(userId + '-supermarket');
        const existingFloor = localStorage.getItem(userId + '-floor');
        const existingArea = localStorage.getItem(userId + '-area');
        const parkingTime = new Date(localStorage.getItem(userId + '-parkingTime'));
        const currentTime = new Date();
        const timeDifference = (currentTime - parkingTime) / (1000 * 60 * 60); // Thời gian chênh lệch tính bằng giờ

        if (existingSupermarket && existingFloor && existingArea && timeDifference <= 24) {
            document.getElementById('confirmation').style.display = 'block';

            document.getElementById('yes-button').addEventListener('click', function() {
                saveParkingPosition(supermarket, floor, area);
                document.getElementById('confirmation').style.display = 'none';
                document.getElementById('position-info').innerHTML = `
                    Tên siêu thị: ${supermarket}<br>
                    Tầng: ${floor}<br>
                    Khu vực: ${area}<br>
                    Thời gian: ${new Date().toLocaleString()}
                `;
            });

            document.getElementById('no-button').addEventListener('click', function() {
                document.getElementById('confirmation').style.display = 'none';
                document.getElementById('position-info').innerHTML = `
                    Tên siêu thị: ${existingSupermarket}<br>
                    Tầng: ${existingFloor}<br>
                    Khu vực: ${existingArea}<br>
                    Thời gian: ${parkingTime.toLocaleString()}
                `;
            });
        } else {
            saveParkingPosition(supermarket, floor, area);
            document.getElementById('position-info').innerHTML = `
                Tên siêu thị: ${supermarket}<br>
                Tầng: ${floor}<br>
                Khu vực: ${area}<br>
                Thời gian: ${new Date().toLocaleString()}
            `;
        }
    }
}

// Kiểm tra thời gian và hiển thị thông tin xe
function displayCarInfo() {
    const userId = getUserId();
    const supermarket = localStorage.getItem(userId + '-supermarket');
    const floor = localStorage.getItem(userId + '-floor');
    const area = localStorage.getItem(userId + '-area');
    const parkingTime = new Date(localStorage.getItem(userId + '-parkingTime'));
    const currentTime = new Date();
    const timeDifference = (currentTime - parkingTime) / (1000 * 60 * 60); // Thời gian chênh lệch tính bằng giờ

    if (supermarket && floor && area && parkingTime) {
        if (timeDifference > 24) {
            document.getElementById('car-info').innerHTML = 'Mã đã hết hạn.';
        } else {
            document.getElementById('car-info').innerHTML = `
                Tên siêu thị: ${supermarket}<br>
                Tầng: ${floor}<br>
                Khu vực: ${area}<br>
                Thời gian: ${parkingTime.toLocaleString()}
            `;
            const entrance = getQueryParameter('entrance');
            if (entrance) {
                saveEntranceInfo(entrance);
                const mapImageSrc = `${entrance}-${floor}-${area}.png`;
                document.getElementById('map-image').src = mapImageSrc;
                document.getElementById('map-image').style.display = 'block';

                const entranceFloor = entrance.split('-')[1];
                if (entranceFloor !== floor) {
                    document.getElementById('notification').innerHTML = `Bạn đang ở tầng ${entranceFloor}, xe của bạn ở tầng ${floor}`;
                    document.getElementById('notification').style.display = 'block';
                } else {
                    document.getElementById('notification').style.display = 'none';
                }
            }
        }
    } else {
        document.getElementById('car-info').innerHTML = 'Bạn chưa lưu thông tin vị trí đỗ xe.';
    }
}

// Xác định trang hiện tại và thực hiện chức năng tương ứng
if (window.location.pathname.includes('index.html')) {
    displayParkingInfo();
} else if (window.location.pathname.includes('find-car.html')) {
    displayCarInfo();
}
