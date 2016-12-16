var walk = require('../../directories').walk;
var path = require('path');
var N = require('../');
var expect = require('chai').expect;

describe('nodes', function () {
  it('has a module', function () {
    expect(N).to.be.ok;
  });

  describe('isVariableNode', function () {
    it('return true if node is a variable node', function () {
      expect(N.isVariableNode({type: 'variable'})).to.equal(true);
    });

    it('return false if node is not a variable node', function () {
      expect(N.isVariableNode({type: 'fail'})).to.equal(false);
    });
  });

  describe('findValueNodes', function () {
    it('finds value nodes', function () {
      var data = walk(path.join(__dirname, 'testing_dir'));
      var nodes = N.findValueNodes(data);
      expect(nodes.length).to.equal(1);
    });

    it('finds no value nodes', function () {
      var data = walk(path.join(__dirname, 'testing_dir2'));
      var nodes = N.findValueNodes(data);
      expect(nodes.length).to.equal(0);
    });
  });

  describe('findNodesWithContent', function () {
    it('find a node', function () {
      var data = walk(path.join(__dirname, 'testing_dir'));
      var nodes = N.findNodesWithContent('color', data);
      expect(nodes.length).to.equal(1);
      expect(nodes[0].content).to.equal('color');
    });

    it('return empty array if no match is found', function () {
      var data = walk(path.join(__dirname, 'testing_dir'));
      var nodes = N.findNodesWithContent('fail', data);
      expect(nodes.length).to.equal(0);
    });
  });

  describe('findNodesOfType', function () {
    it('finds a node', function () {
      var data = walk(path.join(__dirname, 'testing_dir'));
      var nodes = N.findNodesOfType('declaration', data);
      expect(nodes.length).to.equal(1);
      expect(nodes[0].type).to.equal('declaration');
    });

    it('returns an emtpy array if no match is found', function () {
      var data = walk(path.join(__dirname, 'testing_dir'));
      var nodes = N.findNodesOfType('fail', data);
      expect(nodes.length).to.equal(0);
    });
  });
});