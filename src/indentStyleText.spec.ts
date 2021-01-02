import 'should'

import { indentStyleText } from './indentStyleText'
import { styleText } from './styleText'

describe('indentStyleText', () => {
  it('leaves text unstyled', () => {
    indentStyleText(0, 'some text').should.eql('some text')
  })

  it('trims text on the right', () => {
    indentStyleText(0, ' \t some text   ').should.eql(' \t some text')
  })

  it('indents text', () => {
    indentStyleText(2, 'some text').should.eql('  some text')
  })

  it('indents and trims text on the right', () => {
    indentStyleText(2, '   some text   ').should.eql('     some text')
  })

  it('trims multiline text', () => {
    indentStyleText(0, ' \t \n   some  \t  \n   \t  more text  \n ').should.eql(
      '\n   some\n   \t  more text\n'
    )
  })

  it('indents multiline text', () => {
    indentStyleText(3, ' \n   some    \n   \t  more text  \n  ').should.eql(
      '\n      some\n      \t  more text\n'
    )
  })

  it("doesn't indent only whitespace-lines", () => {
    indentStyleText(3, '\n  \n  \t').should.eql('\n\n')
  })

  it('applies styles to the text', () => {
    indentStyleText(0, 'some text', ['red']).should.eql(
      styleText('some text', 'red')
    )
  })

  it('applies styles separately to lines', () => {
    indentStyleText(0, 'some text\nmore text', ['red']).should.eql(
      `${styleText('some text', 'red')}\n${styleText('more text', 'red')}`
    )
  })

  it('applies styles separately to indented lines', () => {
    indentStyleText(2, 'some text\nmore text', ['red']).should.eql(
      `  ${styleText('some text', 'red')}\n  ${styleText('more text', 'red')}`
    )
  })
})
