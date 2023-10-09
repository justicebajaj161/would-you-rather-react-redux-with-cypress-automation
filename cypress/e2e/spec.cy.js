const url = `http://localhost:3000`

describe('App Component', () => {
  beforeEach(() => {
    cy.visit(`${url}/`);
  });

  it('should load the app correctly', () => {
    cy.get('.hero').should('be.visible');
  });

  it('should render Login when not authenticated or logged in', () => {

    cy.contains('Login').should('be.visible');
    cy.get('select').children().should('be.visible')

  });


});
const users = {
  sarahedo: {
   
  },
  tylermcginnis: {

  },
  johndoe: {

  }
};
describe('Login Component', () => {
  beforeEach(() => {
    cy.visit(`${url}/`);
  });

  it('should display the login component', () => {
    cy.get('.card.question-panel').should('be.visible');
    cy.get('.card-header-title').contains('Login').should('be.visible');
    cy.get('img.is-rounded').should('have.attr', 'alt', 'Login-icon');
    cy.get('select').should('be.visible');
  });

  it('should contain all users in the dropdown', () => {
    // Mock the Redux store to set the users
    cy.window().then((win) => {
      win.store.dispatch({
        type: 'GET_USERS',
        users: users
      });
    });


    cy.get('select').children().should('have.length', Object.keys(users).length + 1);
  });

  it('should set the authenticated user upon selecting a user from the dropdown', () => {
    cy.get('select').select('Coding Ninja One');  
  });
});

describe('Home Component', () => {
  beforeEach(() => {
    cy.visit(`${url}/`);
    cy.window().then((win) => {
      win.store.dispatch({
        type: 'GET_USERS',
        users: users
      });
    });
    cy.get('select').select('Coding Ninja One');
  });

  it(' navbar should be visible once logged in ', () => {
    cy.get('.navbar').should('be.visible');
  });


  it('should render Home component in the navbar', () => {
    cy.get('.navbar').contains(/home/i).should('be.visible');
  });
});


describe('HomeTabs Component', () => {
  beforeEach(() => {
    cy.visit(`${url}/`);
    cy.window().then((win) => {
      win.store.dispatch({
        type: 'GET_USERS',
        users: users
      });
    });
    cy.get('select').select('Coding Ninja One');
  });

  it('should display unanswered  questions tabs', () => {
    cy.contains(/unanswered Questions/i).should('be.visible');

  });
  it('should display answered questions tabs', () => {

    cy.contains(/answered Questions/i).should('be.visible');
  });

  // ... other assertions for questions, buttons, etc.
});


describe('Navbar Component', () => {
  beforeEach(() => {
    // Assuming you visit a page where a user is logged in
    cy.visit(`${url}/`);
    cy.window().then((win) => {
      win.store.dispatch({
        type: 'GET_USERS',
        users: users
      });
    });
    cy.get('select').select('Coding Ninja One');
  });

  it('should display correct Home link', () => {
    cy.get('.navbar-item').contains('Home').should('be.visible');

  });
  it('should display correct New Question link', () => {

    cy.get('.navbar-item').contains('New Question').should('be.visible');

  });
  it('should display correct Leadboard link', () => {

    cy.get('.navbar-item').contains('Leadboard').should('be.visible');
  });

  it('On clicking the new question link it should route to /add', () => {
    cy.get('.navbar-item').contains(/new question/i).click();
    cy.url().should('eq', 'http://localhost:3000/add');

  });

  it('On clicking the leadboard link it should route to /add', () => {
    cy.get('.navbar-item').contains(/leadboard/i).click()
    cy.url().should('eq', 'http://localhost:3000/leadboard');

  });

  it('should display user name and avatar when logged in', () => {
    cy.get('.username').should('be.visible');
    cy.get('img.is-rounded').should('be.visible');
  });
  it('should toggle dropdown menu correctly', () => {
    cy.get('.dropdown-trigger button').click();
    cy.get('.dropdown-menu').should('be.visible');
    cy.get('.dropdown-item').contains('Logout').should('be.visible');
  });

  it('should handle logout correctly', () => {
    cy.get('.dropdown-trigger button').click();
    cy.get('.dropdown-item').contains('Logout').click();
    // Add assertions to check if the user is logged out, e.g., check if the Login component is visible
  });


  // ... other assertions for dropdown, logout, etc.
});


describe('Page 404 ', () => {
  beforeEach(() => {
    // Assuming you visit a page where a user is logged in
    cy.visit(`${url}/`);
    cy.window().then((win) => {
      win.store.dispatch({
        type: 'GET_USERS',
        users: users
      });
    });
    cy.get('select').select('Coding Ninja One');
  });
  it('should display "You are trying to access an Invalid URL" visible on invalid route', () => {
    cy.visit(`${url}/*`);

    cy.contains(/You are trying to access an Invalid URL/i).should('be.visible');
  });

  // ... other assertions for responsiveness, loading bars, etc.
});
describe('NewQuestion Component', () => {


  it('should display input fields and submit button', () => {
    cy.visit(`${url}/`);
    cy.window().then((win) => {
      win.store.dispatch({
        type: 'GET_USERS',
        users: users
      });
    });
    cy.get('select').select('Coding Ninja One');
    cy.get('.navbar-item').contains(/new question/i).click();
    cy.get('input[name="optionOneText"]').should('be.visible');
    cy.get('input[name="optionTwoText"]').should('be.visible');
    cy.get('.button.is-dark').contains('Submit').should('be.visible');

  });


  it('Can enter the question for what would you rather and than after submition it will route to "/" and the question for the loggined user will be  visible in unanswered questions tab', () => {

    cy.visit(`${url}/`);
    cy.window().then((win) => {
      win.store.dispatch({
        type: 'GET_USERS',
        users: users
      });
    });
    cy.get('select').select('Coding Ninja One');
    cy.get('.dropdown-trigger button').click();
    cy.get('.navbar-item').contains(/new question/i).click();
    cy.get('input[name="optionOneText"]').type('Own a cat')
    cy.get('input[name="optionTwoText"]').type('Own a dog')
    cy.get('.button').contains('Submit').click();
    cy.url().should('eq', 'http://localhost:3000/');
    cy.contains(/Unanswered Questions/i).click()
    cy.contains(/Own a cat/i)
    cy.contains(/Own a dog/i)

  });


});

describe('Unanswered Questions tab', () => {


  it('it should route to "question/:id" after clicking the answer button in the unanswered questions tab', () => {
    cy.visit(`${url}/`);
    cy.window().then((win) => {
      win.store.dispatch({
        type: 'GET_USERS',
        users: users
      });
    });
    cy.get('select').select('Coding Ninja One');
    cy.get('.navbar-item').contains(/new question/i).click();
    cy.get('input[name="optionOneText"]').type('Own a cat')
    cy.get('input[name="optionTwoText"]').type('Own a dog')
    cy.get('.button').contains('Submit').click();
    cy.contains(/Unanswered Questions/i).click()
    cy.get('.button').contains(/Answer/i).click()
    cy.url().should('match', /http:\/\/localhost:3000\/question\/[a-zA-Z0-9-_]+/);

  })


  it('should display question details', () => {
    cy.visit(`${url}/`);
    cy.window().then((win) => {
      win.store.dispatch({
        type: 'GET_USERS',
        users: users
      });
    });
    cy.get('select').select('Coding Ninja One');
    cy.get('.navbar-item').contains(/new question/i).click();
    cy.get('input[name="optionOneText"]').type('Own a cat')
    cy.get('input[name="optionTwoText"]').type('Own a dog')
    cy.get('.button').contains('Submit').click();
    cy.contains(/Unanswered Questions/i).click()
    cy.get('.button').contains(/Answer/i).click()
    cy.url().should('match', /http:\/\/localhost:3000\/question\/[a-zA-Z0-9-_]+/);
    cy.get('.card.question-panel').should('be.visible');
    cy.get('.card-header-title').should('be.visible');
    cy.get('img.is-rounded').should('be.visible');
    cy.get('input[type="radio"]').should('have.length', 2);
    cy.get('.button').contains('Submit').should('be.visible');
  });
});



describe('Answered Questions tab', () => {
  it('should display question details in answered questions tab ', () => {
    cy.visit(`${url}/`);
    cy.window().then((win) => {
      win.store.dispatch({
        type: 'GET_USERS',
        users: users
      });
    });
    cy.get('select').select('Coding Ninja One');
    cy.get('.navbar-item').contains(/new question/i).click();
    cy.get('input[name="optionOneText"]').type('Own a cat')
    cy.get('input[name="optionTwoText"]').type('Own a dog')
    cy.get('.button').contains('Submit').click();
    cy.contains(/Unanswered Questions/i).click()
    cy.get('.button').contains(/Answer/i).click()
    cy.url().should('match', /http:\/\/localhost:3000\/question\/[a-zA-Z0-9-_]+/);
    cy.get('input[type="radio"]').first().check();
    cy.get('.button').contains(/submit/i).click()

    cy.get('.navbar-item').contains(/home/i).click();
    cy.contains('Answered Questions').click()
    cy.contains(/Own a cat/i).should('be.visible')
    cy.contains(/Own a dog/i).should('be.visible')
    cy.get('.button').contains(/view results/i)

  })
  it('should open view details after pressing view details and should route to "question/:id "', () => {
    cy.visit(`${url}/`);
    cy.window().then((win) => {
      win.store.dispatch({
        type: 'GET_USERS',
        users: users
      });
    });
    cy.get('select').select('Coding Ninja One');
    cy.get('.navbar-item').contains(/new question/i).click();
    cy.get('input[name="optionOneText"]').type('Own a cat')
    cy.get('input[name="optionTwoText"]').type('Own a dog')
    cy.get('.button').contains('Submit').click();
    cy.contains(/Unanswered Questions/i).click()
    cy.get('.button').contains(/Answer/i).click()
    cy.url().should('match', /http:\/\/localhost:3000\/question\/[a-zA-Z0-9-_]+/);
    cy.get('input[type="radio"]').first().check();
    cy.get('.button').contains(/submit/i).click()

    cy.get('.navbar-item').contains(/home/i).click();
    cy.contains('Answered Questions').click()
    cy.contains(/Own a cat/i).should('be.visible')
    cy.contains(/Own a dog/i).should('be.visible')
    cy.get('.button').contains(/view results/i).click()
    cy.url().should('match', /http:\/\/localhost:3000\/question\/[a-zA-Z0-9-_]+/);
  })
});

describe('Leadboard Component', () => {
  beforeEach(() => {
    cy.visit(`${url}/`);
    cy.window().then((win) => {
      win.store.dispatch({
        type: 'GET_USERS',
        users: users
      });
    });
    cy.get('select').select('Coding Ninja One');
    cy.get('.navbar-item').contains(/leadboard/i).click();
    cy.url().should('eq', 'http://localhost:3000/leadboard');
  });

  it('should display the leaderboard', () => {
    cy.get('.card.leadboard-panel').should('be.visible');
    cy.get('.card-header-title').should('be.visible');
    cy.get('img.is-rounded').should('be.visible');
    cy.get('.list.leadboard-stats').should('be.visible');
    cy.get('.score-panel').should('be.visible');
  });
});

describe('PrivateRoute Component', () => {
  it('should redirect to "/" if not authenticated', () => {
    cy.visit(`${url}/`);
    cy.window().then((win) => {
      win.store.dispatch({
        type: 'GET_USERS',
        users: users
      });
    });
    cy.get('select').select('Coding Ninja One');
    cy.get('.dropdown-trigger button').click();
    cy.get('.dropdown-item').contains('Logout').click();
    cy.visit(`${url}/add`);
    cy.url().should('include', `${url}`);
    cy.contains(/login/i)
  });

  it('should access the route if authenticated', () => {
    cy.visit(`${url}/`);
    cy.window().then((win) => {
      win.store.dispatch({
        type: 'GET_USERS',
        users: users
      });
    });
    cy.get('select').select('Coding Ninja One');

    cy.get('.navbar-item').contains(/new question/i).click();
    cy.url().should('eq', 'http://localhost:3000/add');
    cy.get('input[name="optionOneText"]').should('be.visible');
  });
});


describe('Redux Store', () => {
  beforeEach(() => {
    cy.visit(`${url}/`);
  });

  it('should have Redux store initialized', () => {
    cy.window().its('store').should('exist');
  });

  it('should have users in the initial state of the store in redux and should be empty', () => {
    cy.window().its('store').invoke('getState').should('deep.equal', {
      users: {}, 
      questions: {},
      authedUser: null,
      loadingBar: {}

    });
  });

  it('should have questions in the initial state of the store in redux and should be empty', () => {
    cy.window().its('store').invoke('getState').should('deep.equal', {

      users: {}, 
      questions: {},
      authedUser: null,
      loadingBar: {}

    });
  });

  it('should have authedUser in the initial state of the store in redux and should be null', () => {
    cy.window().its('store').invoke('getState').should('deep.equal', {

      users: {}, 
      questions: {},
      authedUser: null,
      loadingBar: {}

    });
  });

  it('should have loadingBar in the initial state of the store in redux and should be empty', () => {
    cy.window().its('store').invoke('getState').should('deep.equal', {
      users: {}, 
      questions: {},
      authedUser: null,
      loadingBar: {}
    });
  });

 
  it('should update users when GET_USERS action is dispatched', () => {
    const mockUsers = {
      sarahedo: {
      },
    
    };

    cy.window().its('store').invoke('dispatch', {
      type: 'GET_USERS',
      users: mockUsers,
    });

    cy.window().its('store').invoke('getState').its('users').should('deep.equal', mockUsers);
  });

  it('should update answers for a user when ADD_ANSWER_TO_USER action is dispatched', () => {
    const mockAnswer = {
      authedUser: 'sarahedo',
      qid: 'question123',
      answer: 'optionOne',
    };

    cy.window().its('store').invoke('dispatch', {
      type: 'ADD_ANSWER_TO_USER',
      ...mockAnswer,
    });

    cy.window().its('store').invoke('getState').its('users').its(mockAnswer.authedUser).its('answers').its(mockAnswer.qid).should('equal', mockAnswer.answer);
  });

  it('should add a question ID to user when ADD_QUESTION_TO_USER action is dispatched', () => {
    const mockQuestion = {
      authedUser: 'sarahedo',
      id: 'newQuestionId',
    };

    cy.window().its('store').invoke('dispatch', {
      type: 'ADD_QUESTION_TO_USER',
      ...mockQuestion,
    });

    cy.window().its('store').invoke('getState').its('users').its(mockQuestion.authedUser).its('questions').should('include', mockQuestion.id);
  });

  it('should set authedUser when SET_AUTHED_USER action is dispatched', () => {

    cy.window().then((win) => {
      win.store.dispatch({
        type: 'GET_USERS',
        users: users
      });
    });
    cy.get('select').select('Coding Ninja One');

    const mockUserId = 'sarahedo';

    cy.window().its('store').invoke('dispatch', {
      type: 'SET_AUTHED_USER',
      id: mockUserId,
    });
    cy.window().its('store').invoke('getState').its('authedUser').should('equal', mockUserId);
  });

});

