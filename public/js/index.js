window.onload = async () => {
  const form = document.getElementById("contact-form");
  const submitBtn = document.getElementById("submit");
  const thanks = document.getElementById("thanks-container");
  submitBtn.addEventListener("click", async () => {
    thanksFunction();
    await postData("https://formspree.io/f/mgerqenw");
  });
  function thanksFunction() {
    form.style.display = "none";
    let msgP = document.createElement("p");
    let msg = document.createTextNode(
      "Mensaje recibido. Gracias por tu tiempo."
    );
    msgP.appendChild(msg);
    thanks.appendChild(msgP);
  }
  async function postData(url) {
    let formData = new FormData();
    formData.append("name", document.getElementsByName("name")[0].value);
    formData.append("email", document.getElementsByName("email")[0].value);
    formData.append("message", document.getElementsByName("message")[0].value);
    await fetch(url, {
      method: "POST",
      body: formData
    });
  }

  class StickyNavigation {
	
    constructor() {
      this.currentId = null;
      this.currentTab = null;
      this.tabContainerHeight = 60;
      let self = this;
      let heroTab = document.querySelectorAll(".tab")
      heroTab.forEach(element=>{
        element.addEventListener("click",(e)=>{
          self.onTabClick(e, element);
        }) 
      })
      
      window.addEventListener('scroll',()=> this.onScroll())
      window.addEventListener('resize',()=> this.onResize())
    }
    
    onTabClick(event, element) {
      event.preventDefault();
      let id = element.getAttribute('href').split("#")[1]
      /* let elementTab =  */document.getElementById(id).scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
      /* console.log(elementTab);
      let scrollTop = elementTab.offsetTop - this.tabContainerHeight + 1;
      document.body.animate({ scrollTop: scrollTop }, 600); */
    }
    
    onScroll() {
      this.checkTabContainerPosition();
      this.findCurrentTabSelector();
    }
    
    onResize() {
      if(this.currentId) {
        this.setSliderCss();
      }
    }
    
    checkTabContainerPosition() {
      let heroTabs= document.querySelector('.tabs')
      let heroOffsetTop = heroTabs.offsetTop
      let heroHeight = heroTabs.offsetHeight 
      let offset = heroOffsetTop + heroHeight - this.tabContainerHeight;
      let windowOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      let container = document.querySelector('.tabs-container')
      let socialContainer = document.querySelector('.social-Icons-Wrapper')
      if(windowOffset > offset) {
        container.classList.add('tabs-container--top');
        socialContainer.classList.add('social-bottom');
      } 
      else {
        container.classList.remove('tabs-container--top');
        socialContainer.classList.remove('social-bottom');
      }
    }
    
    findCurrentTabSelector(element) {
      let newCurrentId;
      let newCurrentTab;
      let self = this;
      let tabs = document.querySelectorAll('.tab')
      tabs.forEach(function(element) {
        let id = element.getAttribute('href').split("#")[1]
        let elementTab = document.getElementById(id)
        let offsetTop = elementTab.offsetTop - self.tabContainerHeight;
        let offsetBottom = elementTab.offsetTop + elementTab.offsetHeight - self.tabContainerHeight;
        let windowOffset = document.documentElement.scrollTop
        /* console.log(windowOffset < offsetTop, windowOffset > offsetBottom); */
        if(!(windowOffset < offsetTop) && !(windowOffset > offsetBottom)) {
          newCurrentId = id;
          newCurrentTab = element;
        }
      });
      if(newCurrentId) {
        this.currentId = newCurrentId;
        this.currentTab = newCurrentTab;
        this.setSliderCss();
      }
    }
    
    setSliderCss() {
      let width = 0;
      let left = 0;
      let slider = document.querySelector('.tab-slider')
      if(this.currentTab) {
        width = this.currentTab.offsetWidth;
        left = this.currentTab.offsetLeft;
      }
      slider.style.cssText = `width:${width}px;left:${left}px;`

    }
    
  }
  
  new StickyNavigation();
};
