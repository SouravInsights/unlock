/* eslint-disable no-undef */

import styled from 'styled-components'
import Close from '../buttons/layout/Close'

export const Quit = styled(Close)`
  position: absolute;
  right: 16px;
  top: 16px;
`

interface MessageBoxProps {
  width?: number
}

export const MessageBox = styled.div<MessageBoxProps>`
  background: var(--white);
  width: ${(props) => props.width || '300'}px;
  border-radius: 4px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--darkgrey);
  font-size: 20px;
`

export const Greyout = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: var(--alwaysontop);
`
