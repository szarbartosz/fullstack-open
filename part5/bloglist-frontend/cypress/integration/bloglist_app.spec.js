describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Jan Kowalski',
      username: 'jkowalski',
      password: 'okon'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('input#username').type('jkowalski')
      cy.get('input#password').type('okon')
      cy.get('#login-button').click()

      cy.contains('logged-in as: Jan Kowalski')
    })

    it('fails with wrong credentials', function() {
      cy.get('input#username').type('anna')
      cy.get('input#password').type('nowak')
      cy.get('#login-button').click()

      cy.contains('Wrong credentials')
      cy.get('html').should('not.contain', 'logged-in as: Jan Kowalski')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'jkowalski', password: 'okon' })
    })

    it('A blog can be created and added to blog-list', function() {
      cy.contains('new blog').click()

      cy.get('input#title').type('interstellar overdrive')
      cy.get('input#author').type('pf')
      cy.get('input#url').type('www.syd.com')

      cy.contains('save').click()

      cy.get('#blog-list').contains('interstellar overdrive')
    })

    describe('and some blogs exists', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'first blog', author: 'first author', url: '1st url' })
        cy.createBlog({ title: 'second blog', author: 'second author', url: '2nd url' })
        cy.createBlog({ title: 'third blog', author: 'third author', url: '3rd url' })
      })

      it('they are listed in a bloglist', function () {
        cy.get('#blog-list').should('contain', 'first blog')
      })

      it('one of them can be liked by an user', function () {
        cy.get('#expand-button').click()
        cy.get('#likes-paragraph').should('contain', '0')
        cy.get('#like-button').click()
        cy.get('#likes-paragraph').should('contain', '1')
      })

      it('one of them can be deleted by it\'s creator', function() {
        cy.get('#expand-button').click()
        cy.get('#blog-list').should('contain', 'first blog')
        cy.get('#delete-button').click()
        cy.get('#blog-list').should('not.contain', 'first blog')
      })

      it('the one with the most likes is listed first', function() {
        cy.contains('second blog').parent().find('#expand-button').as('expandButton')
        cy.contains('second blog').parent().find('#like-button').as('likeButton')
        cy.get('@expandButton').click()
        cy.get('@likeButton').click()
        cy.visit('http://localhost:3000')

        cy.get('#blog-list').then(($blogs) => {
          const mappedBlogs = $blogs.map(b => b.likes)
          let sorted = true
          for (let i = 0; i < mappedBlogs.length - 1; i++) {
            if (mappedBlogs[i] < mappedBlogs[i+1]) {
              sorted = false
            }
          }
          expect(sorted).equal(true)
        })
      })
    })
  })
})