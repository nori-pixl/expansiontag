document.addEventListener("DOMContentLoaded", () => {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes retroBlink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
    .retro-effect-blink { animation: retroBlink 1.0s steps(1, start) infinite; }
    @keyframes rainbowText {
      0% { color: #ff0000; } 17% { color: #ff00ff; } 33% { color: #0000ff; }
      50% { color: #00ffff; } 66% { color: #00ff00; } 83% { color: #ffff00; } 100% { color: #ff0000; }
    }
    @keyframes rainbowBorder {
      0% { border-color: #ff0000; } 17% { border-color: #ff00ff; } 33% { border-color: #0000ff; }
      50% { border-color: #00ffff; } 66% { border-color: #00ff00; } 83% { border-color: #ffff00; } 100% { border-color: #ff0000; }
    }
    .retro-effect-rainbow-text { animation: rainbowText 3s linear infinite; }
    .retro-effect-rainbow-img { border: 5px solid #ff0000; animation: rainbowBorder 3s linear infinite; }
    @keyframes marqueeScroll { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
    @keyframes marqueeAlternate { 0% { transform: translateX(0%); } 100% { transform: translateX(calc(100vw - 100% - 40px)); } }
    @keyframes marqueeStop { 0% { transform: translateX(100%); } 100% { transform: translateX(0%); } }
    .retro-slide-outer { width: 100%; overflow: hidden; white-space: nowrap; box-sizing: border-box; }
    .retro-slide-inner-scroll { display: inline-block; animation: marqueeScroll 10s linear infinite; }
    .retro-slide-inner-alternate { display: inline-block; animation: marqueeAlternate 5s ease-in-out infinite alternate; }
    .retro-slide-inner-stop { display: inline-block; animation: marqueeStop 5s linear forwards; }
    @keyframes retroWaterWave {
      0% { transform: skewX(-4px) scaleY(1); }
      25% { transform: skewX(4px) scaleY(1.03); }
      50% { transform: skewX(-3px) scaleY(0.97); }
      75% { transform: skewX(5px) scaleY(1.02); }
      100% { transform: skewX(-4px) scaleY(1); }
    }
    .retro-effect-water { display: inline-block; transform-origin: center bottom; }
    @keyframes retroStandardShake {
      0% { transform: translate(0,0); }
      20% { transform: translate(-2px,1px); }
      40% { transform: translate(2px,-1px); }
      60% { transform: translate(-1px,-2px); }
      80% { transform: translate(2px,2px); }
      100% { transform: translate(0,0); }
    }
    .retro-effect-shake-default { display: inline-block; animation: retroStandardShake 0.1s linear infinite; }
  `;
  document.head.appendChild(style);

  const switchRegistry = {};
  const regularScripts = [];

  document.querySelectorAll('script').forEach(script => {
    const typeAttr = script.getAttribute('type');
    if (!typeAttr) return;

    if (typeAttr.startsWith('switch/')) {
      const parts = typeAttr.split('/');
      if (parts.length === 3 && parts[1] !== 'ms' && !parts[1].endsWith('ms')) {
        const switchId = parts[1];
        const childId = parts[2];
        if (!switchRegistry[switchId]) {
          switchRegistry[switchId] = [];
        }
        switchRegistry[switchId].push({
          order: parseInt(childId, 10) || 0,
          html: script.innerHTML.trim(),
          element: script
        });
      } else {
        regularScripts.push(script);
      }
    } else {
      regularScripts.push(script);
    }
  });
  regularScripts.forEach(script => {
    const typeAttr = script.getAttribute('type');
    if (!typeAttr.startsWith('switch')) return;

    const parts = typeAttr.split('/');
    const switchId = parts[1];
    let intervalTime = 1000;
    if (parts[2] && parts[2].endsWith('ms')) {
      intervalTime = parseInt(parts[2], 10) || 1000;
    }

    const data = switchRegistry[switchId];
    if (!data || data.length === 0) return;

    data.sort((a, b) => a.order - b.order);

    const container = document.createElement('div');
    container.style.display = 'inline-block';
    const elements = [];

    data.forEach((child, index) => {
      const itemDiv = document.createElement('div');
      itemDiv.innerHTML = child.html;
      itemDiv.style.display = index === 0 ? 'block' : 'none';
      container.appendChild(itemDiv);
      elements.push(itemDiv);
    });

    script.parentNode.insertBefore(container, script);

    let currentIndex = 0;
    setInterval(() => {
      elements[currentIndex].style.display = 'none';
      currentIndex = (currentIndex + 1) % elements.length;
      elements[currentIndex].style.display = 'block';
    }, intervalTime);
  });

  regularScripts.forEach(script => {
    const typeAttr = script.getAttribute('type');
    if (!typeAttr || !typeAttr.includes('/') || typeAttr.startsWith('switch')) return;

    const rawContent = script.textContent.trim();
    if (!rawContent) return;

    const parts = typeAttr.split('/');
    const mediaType = parts[0];
    const effectType = parts[1];
    const option1 = parts[2] || '';
    const option2 = parts[3] || '';

    let wrapper = document.createElement('div');
    wrapper.style.display = 'inline-block';

    let targetContainer = wrapper; 

    if (effectType === 'slide') {
      const outer = document.createElement('div');
      outer.className = 'retro-slide-outer';
      const inner = document.createElement('div');
      if (option1 === 'alternate') inner.className = 'retro-slide-inner-alternate';
      else if (option1 === 'stop') inner.className = 'retro-slide-inner-stop';
      else inner.className = 'retro-slide-inner-scroll';
      outer.appendChild(inner);
      wrapper.appendChild(outer);
      targetContainer = inner;
      wrapper.style.display = 'block';
    }

    if (mediaType === 'text') {
      targetContainer.innerHTML = rawContent;
      
      if (effectType === 'blink') {
        targetContainer.classList.add('retro-effect-blink');
      } else if (effectType === 'rainbow') {
        targetContainer.classList.add('retro-effect-rainbow-text');
        targetContainer.querySelectorAll('*').forEach(child => child.classList.add('retro-effect-rainbow-text'));
      } else if (effectType === 'water') {
        targetContainer.classList.add('retro-effect-water');
        const duration = (option1 && option1.endsWith('ms')) ? option1 : '2000ms';
        targetContainer.style.animation = `retroWaterWave ${duration} ease-in-out infinite`;
      } else if (effectType === 'shake') {
        if (option1 && option2) {
          const animName = `shake_${Math.random().toString(36).substr(2,9)}`;
          const dynStyle = document.createElement('style');
          dynStyle.textContent = `
            @keyframes ${animName} {
              0% { transform: translate(0,0); }
              20% { transform: translate(calc(-1 * ${option1}), ${option2}); }
              40% { transform: translate(${option1}, calc(-1 * ${option2})); }
              60% { transform: translate(calc(-0.5 * ${option1}), calc(-1 * ${option2})); }
              80% { transform: translate(${option1}, ${option2}); }
              100% { transform: translate(0,0); }
            }
          `;
          document.head.appendChild(dynStyle);
          targetContainer.style.display = 'inline-block';
          targetContainer.style.animation = `${animName} 0.15s linear infinite`;
        } else {
          targetContainer.classList.add('retro-effect-shake-default');
        }
      } else if (effectType === 'jump') {
        const animName = `jump_${Math.random().toString(36).substr(2,9)}`;
        const dynStyle = document.createElement('style');
        const jumpHeight = option1 || '30px';
        dynStyle.textContent = `
          @keyframes ${animName} {
            0%, 100% { transform: translateY(0) scaleY(1); animation-timing-function: ease-out; }
            45% { transform: translateY(calc(-1 * ${jumpHeight})) scaleY(1); animation-timing-function: ease-in; }
            90% { transform: translateY(0) scaleY(0.9); }
          }
        `;
        document.head.appendChild(dynStyle);
        targetContainer.style.display = 'inline-block';
        targetContainer.style.animation = `${animName} 0.6s infinite`;
      }
    } 
    else if (mediaType === 'img') {
      if (rawContent.startsWith('<img')) {
        targetContainer.innerHTML = rawContent;
      } else {
        targetContainer.innerHTML = `<img src="${rawContent}" alt="Retro Image">`;
      }
      const imgElement = targetContainer.querySelector('img');
      if (imgElement) {
        if (effectType === 'blink') {
          imgElement.classList.add('retro-effect-blink');
        } else if (effectType === 'rainbow') {
          imgElement.classList.add('retro-effect-rainbow-img');
        } else if (effectType === 'water') {
          imgElement.classList.add('retro-effect-water');
          const duration = (option1 && option1.endsWith('ms')) ? option1 : '2000ms';
          imgElement.style.animation = `retroWaterWave ${duration} ease-in-out infinite`;
        } else if (effectType === 'shake') {
          if (option1 && option2) {
            const animName = `shake_${Math.random().toString(36).substr(2,9)}`;
            const dynStyle = document.createElement('style');
            dynStyle.textContent = `
              @keyframes ${animName} {
                0% { transform: translate(0,0); }
                20% { transform: translate(calc(-1 * ${option1}), ${option2}); }
                40% { transform: translate(${option1}, calc(-1 * ${option2})); }
                60% { transform: translate(calc(-0.5 * ${option1}), calc(-1 * ${option2})); }
                80% { transform: translate(${option1}, ${option2}); }
                100% { transform: translate(0,0); }
              }
            `;
            document.head.appendChild(dynStyle);
            imgElement.style.display = 'inline-block';
            imgElement.style.animation = `${animName} 0.15s linear infinite`;
          } else {
            imgElement.classList.add('retro-effect-shake-default');
          }
        } else if (effectType === 'jump') {
          const animName = `jump_${Math.random().toString(36).substr(2,9)}`;
          const dynStyle = document.createElement('style');
          const jumpHeight = option1 || '30px';
          dynStyle.textContent = `
            @keyframes ${animName} {
              0%, 100% { transform: translateY(0) scaleY(1); animation-timing-function: ease-out; }
              45% { transform: translateY(calc(-1 * ${jumpHeight})) scaleY(1); animation-timing-function: ease-in; }
              90% { transform: translateY(0) scaleY(0.9); }
            }
          `;
          document.head.appendChild(dynStyle);
          imgElement.style.display = 'inline-block';
          imgElement.style.animation = `${animName} 0.6s infinite`;
        }
      }
    }

    if (wrapper.innerHTML) {
      script.parentNode.insertBefore(wrapper, script);
    }
  });
});
