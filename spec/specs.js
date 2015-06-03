describe("Player", function() {
  it("will create an instance of a player", function() {
    var john = new Player("John");
    expect(john.name).to.equal("John");
  });

  describe("this.roll", function() {
    it("will return a number between one and six", function() {
      var john = new Player("John");
      expect("0123456").to.contain(john.roll());
    });
  });

  describe("this.score", function() {
    it("will keep track of a player's score", function () {
      var john = new Player("John");
      expect("0123456").to.contain(john.score);
    });
  });

  describe("this.hold", function() {
    it("will tally the score from the seesion", function() {
      var john = new Player("John");
      john.roll();
      expect("0123456").to.contain(john.session);
    })
  })
});
