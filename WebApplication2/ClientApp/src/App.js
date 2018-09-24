import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            server: '',
            local: ''
        }
    }

    local = (target) => {
        const data = new FormData(target)
        const translate = data.get('local').split(' ')
        const translation = translate.map(word => {
            const part = word.split('ay')[0]
            if (part.charAt(part.length - 1) === 'w') {
                return part.slice(0, -1)
            }
            return part.substring(part.length - 1) + part.slice(0, -1)
        })
        return translation.join(' ')
    }

    translate = (target) => {
        this.setState({server: ""})
        const data = new FormData(target)
        fetch('/api/SampleData/ConvertString', {
            method: 'post',
            body: data
        }).then(res => res.json()).then(res => this.setState({server: res}))
  }

    render() {
        const {local, server} = this.state
      return (
          <div>
              <div className='server'>
                  <form onSubmit={(e) => {
                      e.preventDefault()
                      this.translate(e.target)
                  }}>
                      <input name='translate' />
                      <Button type='submit'>Engligh to Piglatin (server)</Button>
                  </form>
                  {this.state.server && <textarea defaultValue={server} />}
              </div>
              <div className='local'>
                  <form onSubmit={(e) => {
                      e.preventDefault()
                      this.setState({ local: this.local(e.target) })
                  }}>
                      <input name='local' />
                      <Button type='submit' onClick={() => this.setState({ local: '' })}>Piglatin to English (JS)</Button>
                  </form>
                  {this.state.local && <textarea defaultValue={local} />}
              </div>
          </div>
    );
  }
}
