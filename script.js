document.addEventListener('DOMContentLoaded', () => {
  const loadingScreen = document.getElementById('loading-screen');

  // Hide the loading screen after the page is loaded
  window.addEventListener('load', () => {
    loadingScreen.style.transition = 'opacity 3s ease';
    loadingScreen.style.opacity = '0';

    // Remove the loading screen after the transition
    loadingScreen.addEventListener('transitionend', () => {
      loadingScreen.remove();
    });
  });
});

////AUDIO

document.addEventListener('DOMContentLoaded', () => {
  const audioTracks = [
    'audio1.mp3',
    'audio2.mp3',
    'audio3.mp3',
    'audio4.mp3',
  ];

  const audioToggle = document.getElementById('audio-toggle');
  const playButton = audioToggle.querySelector('.play-button');
  const audioElement = document.getElementById('myAudio');

  function selectRandomTrack() {
    const randomIndex = Math.floor(Math.random() * audioTracks.length);
    audioElement.src = audioTracks[randomIndex];
  }

  selectRandomTrack();
  audioToggle.classList.add('paused');
  audioToggle.addEventListener('click', () => {
    playButton.classList.toggle('paused');
    audioToggle.classList.toggle('paused');
    if (audioElement.paused) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  });
});
var canvas1 = document.getElementById('canvas1');
var canvas2 = document.getElementById('canvas2');
var canvas3 = document.getElementById('canvas3');
var ctx1 = canvas1.getContext('2d');
var ctx2 = canvas2.getContext('2d');
var ctx3 = canvas3.getContext('2d');

var rainthroughnum = 500;
var speedRainTrough = 15;
var RainTrough = [];

var rainnum = 500;
var rain = [];

var lightning = [];
var lightTimeCurrent = 0;
var lightTimeTotal = 0;

var w = (canvas1.width = canvas2.width = canvas3.width = window.innerWidth);
var h = (canvas1.height = canvas2.height = canvas3.height = window.innerHeight);
window.addEventListener('resize', function () {
  w = canvas1.width = canvas2.width = canvas3.width = window.innerWidth;
  h = canvas1.height = canvas2.height = canvas3.height = window.innerHeight;
});

function random(min, max) {
  return Math.random() * (max - min + 1) + min;
}

function clearcanvas1() {
  ctx1.clearRect(0, 0, w, h);
}

function clearcanvas2() {
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
}

function clearCanvas3() {
  ctx3.globalCompositeOperation = 'destination-out';
  ctx3.fillStyle = 'rgba(0,0,0,' + random(1, 30) / 100 + ')';
  ctx3.fillRect(0, 0, w, h);
  ctx3.globalCompositeOperation = 'source-over';
}

function createRainTrough() {
  for (var i = 0; i < rainthroughnum; i++) {
    RainTrough[i] = {
      x: random(0, w),
      y: random(0, h),
      length: Math.floor(random(1, 830)),
      opacity: Math.random() * 0.2,
      xs: random(-2, 2),
      ys: random(10, 20),
    };
  }
}

function createRain() {
  for (var i = 0; i < rainnum; i++) {
    rain[i] = {
      x: Math.random() * w,
      y: Math.random() * h,
      l: Math.random() * 1,
      xs: -4 + Math.random() * 4 + 2,
      ys: Math.random() * 10 + 10,
    };
  }
}

function createLightning() {
  var x = random(100, w - 100);
  var y = random(0, h / 4);

  var createCount = random(1, 3);
  for (var i = 0; i < createCount; i++) {
    single = {
      x: x,
      y: y,
      xRange: random(5, 30),
      yRange: random(10, 25),
      path: [
        {
          x: x,
          y: y,
        },
      ],
      pathLimit: random(40, 55),
    };
    lightning.push(single);
  }
}

function drawRainTrough(i) {
  ctx1.beginPath();
  var grd = ctx1.createLinearGradient(
    0,
    RainTrough[i].y,
    0,
    RainTrough[i].y + RainTrough[i].length
  );
  grd.addColorStop(0, 'rgba(255,255,255,0)');
  grd.addColorStop(1, 'rgba(255,255,255,' + RainTrough[i].opacity + ')');

  ctx1.fillStyle = grd;
  ctx1.fillRect(RainTrough[i].x, RainTrough[i].y, 1, RainTrough[i].length);
  ctx1.fill();
}

function drawRain(i) {
  ctx2.beginPath();
  ctx2.moveTo(rain[i].x, rain[i].y);
  ctx2.lineTo(
    rain[i].x + rain[i].l * rain[i].xs,
    rain[i].y + rain[i].l * rain[i].ys
  );
  ctx2.strokeStyle = 'rgba(174,194,224,0.5)';
  ctx2.lineWidth = 1;
  ctx2.lineCap = 'round';
  ctx2.stroke();
}

function drawLightning() {
  for (var i = 0; i < lightning.length; i++) {
    var light = lightning[i];

    light.path.push({
      x:
        light.path[light.path.length - 1].x +
        (random(0, light.xRange) - light.xRange / 2),
      y: light.path[light.path.length - 1].y + random(0, light.yRange),
    });

    if (light.path.length > light.pathLimit) {
      lightning.splice(i, 1);
    }

    ctx3.strokeStyle = 'rgba(255, 255, 255, .1)';
    ctx3.lineWidth = 3;
    if (random(0, 15) === 0) {
      ctx3.lineWidth = 6;
    }
    if (random(0, 30) === 0) {
      ctx3.lineWidth = 8;
    }

    ctx3.beginPath();
    ctx3.moveTo(light.x, light.y);
    for (var pc = 0; pc < light.path.length; pc++) {
      ctx3.lineTo(light.path[pc].x, light.path[pc].y);
    }
    if (Math.floor(random(0, 30)) === 1) {
      //to fos apo piso
      ctx3.fillStyle = 'rgba(255, 255, 255, ' + random(1, 3) / 100 + ')';
      ctx3.fillRect(0, 0, w, h);
    }
    ctx3.lineJoin = 'miter';
    ctx3.stroke();
  }
}

function animateRainTrough() {
  clearcanvas1();
  for (var i = 0; i < rainthroughnum; i++) {
    if (RainTrough[i].y >= h) {
      RainTrough[i].y = h - RainTrough[i].y - RainTrough[i].length * 5;
    } else {
      RainTrough[i].y += speedRainTrough;
    }
    drawRainTrough(i);
  }
}

function animateRain() {
  clearcanvas2();
  for (var i = 0; i < rainnum; i++) {
    rain[i].x += rain[i].xs;
    rain[i].y += rain[i].ys;
    if (rain[i].x > w || rain[i].y > h) {
      rain[i].x = Math.random() * w;
      rain[i].y = -20;
    }
    drawRain(i);
  }
}

function animateLightning() {
  clearCanvas3();
  lightTimeCurrent++;
  if (lightTimeCurrent >= lightTimeTotal) {
    createLightning();
    lightTimeCurrent = 0;
    lightTimeTotal = 200; //rand(100, 200)
  }
  drawLightning();
}

function init() {
  createRainTrough();
  createRain();
  window.addEventListener('resize', createRainTrough);
}
init();

function animloop() {
  animateRainTrough();
  animateRain();
  animateLightning();
  requestAnimationFrame(animloop);
}
animloop();

document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll('.button');
  const screen = document.querySelector('.screen');
  let screenValue = '';
  let isResult = false;

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      const buttonText = button.textContent;
      handleButtonClick(buttonText);
    });

    button.addEventListener('mousedown', function () {
      button.classList.add('button--active');
    });

    button.addEventListener('mouseup', function () {
      button.classList.remove('button--active');
    });
  });

  //UPDATE FONT SIZE

  function updateFontSize() {
    const currentInputLength = getCurrentInputDigits();
    if (currentInputLength < 10) {
      screen.style.fontSize = '24px';
    } else if (currentInputLength >= 10 && currentInputLength < 20) {
      screen.style.fontSize = '20px';
    } else if (currentInputLength >= 20 && currentInputLength < 30) {
      screen.style.fontSize = '16px';
    } else if (currentInputLength >= 30) {
      screen.style.fontSize = '12px';
    }
  }

  //GET CURRENT INPUT

  function getCurrentInputDigits() {
    const lastOperatorIndex = Math.max(
      screenValue.lastIndexOf('+'),
      screenValue.lastIndexOf('-'),
      screenValue.lastIndexOf('*'),
      screenValue.lastIndexOf('/')
    );
    const currentInput = screenValue.slice(lastOperatorIndex + 1);
    return currentInput.length;
  }

  ////////HANDLE BUTTONS
  function handleButtonClick(buttonText) {
    console.log('Clicked:', buttonText); // Add this line
    if (isResult && !(buttonText === 'C')) {
      if (!isNaN(buttonText) || buttonText === '(' || buttonText === '.') {
        screenValue = '';
        isResult = false;
      } else {
        return;
      }
    }

    // Add this condition to limit the max size of the first input number
    if (
      getCurrentInputDigits() >= 32 &&
      (!isNaN(buttonText) || buttonText === '.')
    ) {
      return;
    }

    if (buttonText === 'C') {
      // clear screen
      screenValue = '';
      screen.textContent = '0';
    } else if (buttonText === '=' || buttonText === 'Enter') {
      // evaluate expression
      if (screenValue.includes('(') && !screenValue.includes(')')) {
        screenValue += ')';
      }
      const expression = screenValue; // Add this line to define the expression variable
      screen.textContent = eval(screenValue);
      screenValue = screen.textContent;
      isResult = true;

      // Add the entire calculation to history
      const historyEntry = document.createElement('div');
      historyEntry.textContent = `${expression} = ${screenValue}`;
      historyContent.appendChild(historyEntry);
    } else if (buttonText === '⌫') {
      // erase last character from screenValue
      screenValue = screenValue.slice(0, -1);
      screen.textContent = screenValue;
    } else if (buttonText === 'H') {
      historyContainer.style.display =
        historyContainer.style.display === 'none' ? 'block' : 'none';
    } else {
      // append text to screen
      if (
        (buttonText === '+' ||
          buttonText === '-' ||
          buttonText === '*' ||
          buttonText === '/') &&
        (screenValue[screenValue.length - 1] === '+' ||
          screenValue[screenValue.length - 1] === '-' ||
          screenValue[screenValue.length - 1] === '*' ||
          screenValue[screenValue.length - 1] === '/')
      ) {
        screenValue = screenValue.slice(0, -1);
      }
      screenValue += buttonText;
      screen.textContent = screenValue;
      updateFontSize(); //Update FontSize
    }
  }

  //KEYDOWN events
  document.addEventListener('keydown', function (event) {
    const keyName = event.key;
    const validKeys = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '.',
      '+',
      '-',
      '*',
      '/',
      ')',
      '(',
      'Enter',
      'Backspace',
      'Escape',
      'C',
    ];

    // check if pressed key is a valid calculator button
    if (validKeys.includes(keyName)) {
      event.preventDefault(); // prevent default action of key press
      if (keyName === 'Backspace') {
        if (isResult) {
          return;
        }

        //erase last character from screenValue
        screenValue = screenValue.slice(0, -1);
        screen.textContent = screenValue;
      } else if (keyName === 'Escape') {
        screenValue = '';
        screen.textContent = '0';
        // Close the history window
        historyContainer.style.display = 'none';
      } else if (keyName === 'C') {
        // Add this block
        screenValue = '';
        screen.textContent = '0';
      } else {
        // find corresponding button
        const button = document.querySelector(`.button[data-key="${keyName}"]`);
        button.click();
      }
      // simulate click event on corresponding button
    }
  });
});

// History Section Window
const historyBtn = document.querySelector('.history-btn');
const historyContainer = document.getElementById('history-container');
const historyCloseBtn = document.getElementById('history-close-btn');
const historyContent = document.getElementById('history-content');

historyBtn.addEventListener('click', () => {
  historyContainer.style.display = 'block';
});

historyCloseBtn.addEventListener('click', () => {
  historyContainer.style.display = 'none';
});
