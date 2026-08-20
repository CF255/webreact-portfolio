import { describe, it, expect, vi, afterEach } from 'vitest'
import { loginRequest } from './loginRequest'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('loginRequest', () => {
  it('resolves with the parsed response when login succeeds', async () => {
    const responseBody = {
      statuscode: 200,
      body: { accessToken: 'a', refreshToken: 'r', user: { id: '1' } },
    }
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(responseBody),
    }))

    const result = await loginRequest('demo', 'demo1234')

    expect(result).toEqual(responseBody)
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/login'),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ username: 'demo', password: 'demo1234' }),
      })
    )
  })

  it('throws the parsed error body when login fails', async () => {
    const errorBody = { statuscode: 401, body: { error: 'username and/or password incorrect' } }
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve(errorBody),
    }))

    await expect(loginRequest('demo', 'wrong')).rejects.toEqual(errorBody)
  })
})
