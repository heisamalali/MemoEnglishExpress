class AddItemRequest{
    constructor(word,description,itemMeaningEn,itemMeaningFa,itemSynonymEn,categoryId) {
       this.word = word;
       this.description = description;
       this.itemMeaningEn = itemMeaningEn;
       this.itemMeaningFa = itemMeaningFa;
       this.itemSynonymEn = itemSynonymEn;
       this.categoryId = categoryId 
    }
}

module.exports = AddItemRequest