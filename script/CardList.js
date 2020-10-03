class CardList { 
    constructor(container, createCard, api) { 
        this.container = container; 
        this.createCard = createCard; 
        this.api = api; 
    } 
     
    addCard(name, link) { 
     const card = this.createCard(name, link); 
     this.container.append(card.create(name, link)); 
    } 
 
    render(cards) { 
      cards.forEach(element => { 
       this.addCard(element.name, element.link); 
      }); 
    } 
 
    loadInitialCards() { 
      this.api.getInitialCards() 
        .then((data) => { 
          this.render(data); 
        }) 
        .catch((err) => { 
          console.log(err); 
        }); 
    } 
}