using Mastermind.Models;
using NUnit.Framework;

namespace MastermindTest.Tests
{
    public class RowTest
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void TestAllBlacks()
        {
            var row1 = new Row(Colour.Black, Colour.Black, Colour.Black, Colour.Black);
            var row2 = new Row(Colour.Black, Colour.Black, Colour.Black, Colour.Black);
            Assert.AreEqual(4, row1.CompareToOtherRow(row2).Same);
            Assert.AreEqual(0, row1.CompareToOtherRow(row2).SameColour);
        }

        [Test]
        public void TestBlackOrWhite()
        {
            var row1 = new Row(Colour.Black, Colour.Black, Colour.Black, Colour.Black);
            var row2 = new Row(Colour.White, Colour.White, Colour.White, Colour.White);
            Assert.AreEqual(0, row1.CompareToOtherRow(row2).Same);
            Assert.AreEqual(0, row1.CompareToOtherRow(row2).SameColour);
        }

        [Test]
        public void TestTrueColours()
        {
            var row1 = new Row(Colour.Blue, Colour.Green, Colour.Red, Colour.Yellow);
            var row2 = new Row(Colour.Green, Colour.Red, Colour.Yellow, Colour.Blue);
            Assert.AreEqual(0, row1.CompareToOtherRow(row2).Same);
            Assert.AreEqual(4, row1.CompareToOtherRow(row2).SameColour);
        }

        [Test]
        public void TestMoodyBlues()
        {
            var row1 = new Row(Colour.Blue, Colour.Blue, Colour.Black, Colour.Black);
            var row2 = new Row(Colour.Blue, Colour.Blue, Colour.Blue, Colour.Blue);
            Assert.AreEqual(2, row1.CompareToOtherRow(row2).Same);
            Assert.AreEqual(0, row1.CompareToOtherRow(row2).SameColour);
        }

        [Test]
        public void TestHalfRight()
        {
            var row1 = new Row(Colour.Blue, Colour.Red, Colour.Blue, Colour.Red);
            var row2 = new Row(Colour.Blue, Colour.Blue, Colour.Red, Colour.Red);
            Assert.AreEqual(2, row1.CompareToOtherRow(row2).Same);
            Assert.AreEqual(2, row1.CompareToOtherRow(row2).SameColour);
        }

        [Test]
        public void TestSameColourPerPin()
        {
            var masterRow = new Row(Colour.Red, Colour.Red, Colour.Blue, Colour.Black);
            var newRow = new Row(Colour.Black, Colour.Black, Colour.Black, Colour.Red);
            Assert.AreEqual(0, masterRow.CompareToOtherRow(newRow).Same);
            Assert.AreEqual(2, masterRow.CompareToOtherRow(newRow).SameColour);
        }
    }
}