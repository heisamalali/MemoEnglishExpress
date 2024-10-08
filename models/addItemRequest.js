class AddItemRequest{
    constructor(word,description,itemMeaningEn,itemMeaningFa,itemSynonymEn,example,categoryId) {
       this.word = word;
       this.description = description;
       this.itemMeaningEn = itemMeaningEn;
       this.itemMeaningFa = itemMeaningFa;
       this.itemSynonymEn = itemSynonymEn;
       this.categoryId = categoryId;
       this.itemSynonymEn = itemSynonymEn;
       this.Example = example
    }
}

module.exports = AddItemRequest