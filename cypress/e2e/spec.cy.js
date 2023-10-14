/* 
  1-Comprobar cantidad de cuadros en el tablero
  2-Comprobar que arme siempre un patron de colores distintos
  3-Armar los pares y verificar fin del juego
  4-Mostrar mensaje final con cantidad de rondas
*/

const URL = 'http://localhost:8000/'

context('Memotest', () => {
  beforeEach(() =>{
    cy.visit(URL)
  })

  describe('Initial conditios', () =>{
    const SQUARES_NUMBER = 12

    it('check that the board exists and contains all the squares', () =>{
      cy.get('#board').find('.square').should('have.length', SQUARES_NUMBER)
    })


    it('random squares', () => {
      cy.get('#start').click()

      cy.get('.square').then((squares) =>{
        let firstClass = []
        squares.each(function(i, square){
          firstClass.push(square.className)
        })

        cy.visit(URL)

        cy.get('.square').then((squares) =>{
          let newClass = []
          squares.each(function(i, square){
            newClass.push(square.className)
          })

        cy.wrap(firstClass).should('not.deep.equal', newClass)
        })
      })
    })
  })

  describe('Play game', () =>{
    it('round number', () => {
      cy.get('#start').click()

      cy.get(':nth-child(1) > :nth-child(1) > .square').click()
      cy.get(':nth-child(1) > :nth-child(2) > .square').click()

      cy.get("#header-message").should('have.text', 'Round N° 1')
    })

    it('solve the game', () =>{
      let pairs = {}
      cy.get('#start').click()
      cy.get('.square').then((squares) => {
        squares.each((i, square) =>{
          const colorClass = square.className.replace('square h-100 ', '')

          if(pairs[colorClass]){
            pairs[colorClass].push(square)
          } else {
            pairs[colorClass] = [square]
          }
        })
        Object.keys(pairs).forEach((key) =>{
          pairs[key][0].click()
          pairs[key][1].click()
        })
      })
    })
  })

})
