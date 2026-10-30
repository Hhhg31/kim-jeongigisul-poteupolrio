const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#primary-menu');

function setMenu(open) {
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
  menu.classList.toggle('is-open', open);
}

menuButton.addEventListener('click', () => {
  setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
});

menu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menuButton.focus();
  }
});

const projectDetails = {
  mailbox: {
    title: '빨간 우체통',
    eyebrow: 'SHORT FILM · 영춘제 상영작',
    summary: '학교 영화 상영 행사 영춘제를 위해 팀으로 만든 단편영화입니다. 제공된 기간은 3월 중순부터 11월 초까지이며, 연도는 따로 기재하지 않았습니다.',
    blocks: [
      ['목적', '학교 영화 상영 행사 영춘제에서 상영할 단편영화를 팀으로 제작했습니다.'],
      ['맡은 역할', '팀의 메인 카메라 감독을 맡았습니다. 팀에는 감독, 조감독, 메인·서브 카메라, 음향, 각본 역할이 있었습니다.'],
      ['사용한 기술', '촬영, 카메라 설정과 움직임 조절, 색 보정. 전기·전자 기술이나 측정 도구를 사용한 프로젝트는 아닙니다.'],
      ['주요 작업 / 특징', '촬영 현장에서 카메라 설정과 움직임을 조절하고, 화면의 색과 구도를 살폈습니다.'],
      ['어려움', '날씨를 예측하기 어려웠고, 처음에는 카메라 조작이 익숙하지 않았습니다.'],
      ['대응 과정', '쉬는 시간과 다른 팀원들이 쉬는 틈을 활용해 카메라를 직접 연습했습니다.'],
      ['결과', '팀은 완성한 영화를 상영했습니다. 제 카메라 작업은 색감과 구도 면에서 좋은 피드백을 받았습니다.'],
      ['배운 점', '현장에서 소통하고 서로를 배려하는 일이 협력과 완성도에 중요하다는 점을 배웠습니다.']
    ]
  },
  duo: {
    title: '듀오링고 모션그래픽 광고',
    eyebrow: 'MOTION GRAPHICS · 팀 프로젝트',
    summary: '8월 말부터 11월 초까지 진행한 팀 프로젝트입니다. 연도는 따로 기재하지 않았습니다.',
    blocks: [
      ['목적', '듀오의 움직임을 통해 듀오링고의 특징과 장점을 효과적으로 전달하는 모션그래픽 광고를 팀으로 제작했습니다.'],
      ['맡은 역할', '듀오링고의 부엉이 캐릭터 듀오를 애니메이션으로 표현하고 영상 편집에 참여했습니다.'],
      ['사용한 기술', '캐릭터 애니메이션과 영상 편집. 구체적인 소프트웨어나 전기·전자 기술은 제공된 정보에 없습니다.'],
      ['주요 작업 / 특징', '장면과 분위기에 맞춰 캐릭터의 움직임과 타이밍을 다듬는 작업을 맡았습니다.'],
      ['어려움', '모션그래픽은 처음 접하는 분야였고, 움직임을 자연스럽게 만드는 일이 어려웠습니다.'],
      ['대응 과정', '팀원들의 피드백을 받아 반복해서 수정했고, 서로 도우며 더 자연스러운 움직임을 찾아갔습니다.'],
      ['결과', '팀 프로젝트로 광고를 제작했습니다. 별도의 수상이나 정량 성과는 기재하지 않았습니다.'],
      ['배운 점', '새로운 작업도 피드백과 반복을 통해 개선할 수 있고, 서로 돕는 과정이 결과를 다듬는다는 점을 배웠습니다.']
    ]
  }
};

const dialog = document.querySelector('#project-dialog');
const dialogTitle = document.querySelector('#dialog-title');
const dialogEyebrow = document.querySelector('#dialog-eyebrow');
const dialogSummary = document.querySelector('#dialog-summary');
const dialogDetails = document.querySelector('#dialog-details');
const closeButton = dialog.querySelector('.dialog-close');
let lastTrigger = null;

function openProject(key, trigger) {
  const project = projectDetails[key];
  if (!project) return;
  lastTrigger = trigger;
  dialogTitle.textContent = project.title;
  dialogEyebrow.textContent = project.eyebrow;
  dialogSummary.textContent = project.summary;
  dialogDetails.replaceChildren();
  project.blocks.forEach(([label, text], index) => {
    const block = document.createElement('section');
    block.className = `detail-block${index === 0 || index === project.blocks.length - 1 ? ' wide' : ''}`;
    const heading = document.createElement('h3');
    heading.textContent = label;
    const paragraph = document.createElement('p');
    paragraph.textContent = text;
    block.append(heading, paragraph);
    dialogDetails.append(block);
  });
  dialog.showModal();
  closeButton.focus();
}

document.querySelectorAll('[data-project]').forEach((button) => {
  button.addEventListener('click', () => openProject(button.dataset.project, button));
});

function closeProject() {
  if (dialog.open) dialog.close();
}
closeButton.addEventListener('click', closeProject);
dialog.querySelector('.dialog-done').addEventListener('click', closeProject);
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) closeProject();
});
dialog.addEventListener('close', () => {
  if (lastTrigger) lastTrigger.focus();
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
