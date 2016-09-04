'use strict';

var format = require('..');


describe('Basic', function () {
  it('should convert the first argument to regexp', function () {
    format(/0/).should.eql(format('0')).and.eql(format(0));
    format(/.+?/).should.eql(format('.+?'));
  });

  it('should return a regexp', function () {
    format(/z/).should.be.an.instanceOf(RegExp);
    format(0, 1, 2, 3).should.be.an.instanceOf(RegExp);
  });

  it('should return the regexp passed in in the absense of matches', function () {
    format(/z/).should.eql(/z/);
    format(/.+?/, 'this', 'that').should.eql(/.+?/);
  });

  it('should preserve regex flags', function () {
    format(/.+?/g).should.eql(/.+?/g);
    format(/{}/mig, 0).should.eql(/0/mig);
  });
});


describe('Main functionality', function () {
  it('should substitute strings sequentially', function () {
    format(/{}{1} + {}{1} = {}/, 2, 3, 5).should.eql(/2{1} + 3{1} = 5/);
  });

  it('should substitute strings by index', function () {
    format(/{#2}{1} - {#1}{1,} = {#0}{1,2}/, 2, 3, 5).should.eql(/5{1} - 3{1,} = 2{1,2}/);
  });

  it('should skip escaped braces', function () {
    format(/{} \{#2\} {} \{\} \\\\{2} {} \\\{1\\\}/, 'red', 'green', 'blue', -1)
      .should.eql(/red \{#2\} green \{\} \\\\{2} blue \\\{1\\\}/);
    format(/{#0.name} \{#0\} {#0.name}/, { name: 1 }).should.eql(/1 \{#0\} 1/);
  });

  it('should escape RegExp special characters', function () {
    format(/version {}/, '1.5.0').should.eql(/version 1\.5\.0/);
    format(/2{}3 = {} = 8/, '**', '(2^3)').should.eql(/2\*\*3 = \(2\^3\) = 8/);
    format(/{#foo}{#bar}/, {
      foo: function () { return '.'; },
      bar: function () { return '+'; }
    }).should.eql(/\.\+/);
  });

  it('should not manipulate the original parameters', function () {
    var params = {foo: '['};
    format(/{#foo}/, params);
    params.foo.should.eql('[')
  });
});
