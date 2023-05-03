class WordDto {
  //Hash key
  userId
  //Range key
  word
  //Relationship
  categoryName

  constructor(userId, word, wordCategoryDto) {
    this.userId = userId
    this.word = word
    this.categoryName = wordCategoryDto.name
  }
}

class WordCategoryDto {
  //Hash key
  name

  constructor(name) {
    this.name = name
  }
}

module.exports = {
  WordDto,
  WordCategoryDto
}