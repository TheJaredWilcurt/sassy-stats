var F = require('../');
var expect = require('chai').expect;
var path = require('path');
var findDeclarationNodes = require('../../nodes').findDeclarationNodes;
var walk = require('../../directories').walk;
var util = require('util');

describe('colors', function () {
  it('has a module', function () {
    expect(F).to.be.ok;
  });

  describe('nodesToColorUsages', function () {
    it('returns color count', function () {
      var data = walk(path.join(__dirname, 'testing_dir'));
      var nodes = findDeclarationNodes(data);
      var stats = F.nodesToColorUsages(nodes);
      expect(stats['#fff']).to.equal(1);
      expect(stats['white']).to.equal(1);
      expect(stats['#ffffff']).to.equal(3);
      expect(stats['#eee']).to.equal(1);
      expect(stats['orange']).to.equal(1);
      expect(stats['#000000']).to.equal(1);
    });

    it('should not have any other keys apart from the names of the colors found', function () {
      var data = walk(path.join(__dirname, 'testing_dir'));
      var nodes = findDeclarationNodes(data);
      var stats = F.nodesToColorUsages(nodes);
      console.log(util.inspect(stats, false, Infinity));
      expect(stats['#fff']).to.equal(1);
      expect(stats['white']).to.equal(1);
      expect(stats['#ffffff']).to.equal(3);
      expect(stats['#eee']).to.equal(1);
      expect(stats['orange']).to.equal(1);
      expect(stats['#000000']).to.equal(1);
      expect(Object.keys(stats).length).to.equal(6);
    });

    it('counts color usages over multiple files', function () {
      var data = walk(path.join(__dirname, 'testing_dir2'));
      var nodes = findDeclarationNodes(data);
      var stats = F.nodesToColorUsages(nodes);
      expect(stats['#000']).to.equal(2);
      expect(Object.keys(stats).length).to.equal(1);
    });

    it('returns an empty array if no colors are found', function () {
      var data = walk(path.join(__dirname, 'testing_dir3'));
      var nodes = findDeclarationNodes(data);
      var stats = F.nodesToColorUsages(nodes);
      expect(Object.keys(stats).length).to.equal(0);
    });
  });
});