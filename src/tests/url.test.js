/* eslint-disable jest/expect-expect */
/* eslint-disable jest/no-commented-out-tests */
/* eslint-disable no-undef */
import request from 'supertest';
import { jest } from '@jest/globals';
import { nanoid } from 'nanoid';

import { app } from '../app.js';
import { URL } from '../models/url.model.js';


describe('Testing Server Health', () => {
  it('should return 200 OK and a message', async () => {
    const res = await request(app)
      .get('/health')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toEqual({ status: 'OK' });
  });
});


describe('Get All ShortLinks', () => {

  const mockShortLinks = [
    {
      'shortUrl': {
        'ios': 'http://localhost:5000/api/ios/ABCD123',
        'android': 'http://localhost:5000/api/android/ABCD123',
        'web': 'http://localhost:5000/api/web/ABCD123'
      },
      'slug': 'ABCD123',
      'orignUrl': 'https://www.google.com/'
    },
    {
      'shortUrl': {
        'ios': 'http://localhost:5000/api/ios/xyz959',
        'android': 'http://localhost:5000/api/android/xyz959',
        'web': 'http://localhost:5000/api/web/xyz959'
      },
      'slug': 'xyz959',
      'orignUrl': 'https://flaviocopes.com/access/'
    }];

  // Tests that all short links are retrieved successfully.
  it('should return all short links in the db and status 200', async () => {
    // Given
    URL.find = jest.fn().mockResolvedValue(mockShortLinks);

    // When
    const response = await request(app)
      .get('/shortlinks')
      .expect('Content-Type', /json/);

    // Then
    expect(URL.find).toHaveBeenCalled();
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        shortLinks: expect.arrayContaining([
          expect.objectContaining({
            slug: expect.any(String),
            orignUrl: expect.any(String),
            shortUrl: expect.objectContaining({
              ios: expect.any(String),
              android: expect.any(String),
              web: expect.any(String),
            }),
          }),
        ])
      })
    );
  });

  // Tests that a message is returned when there are no short links in the database.
  it('should return no short links in the db and status 200', async () => {
    // Given
    URL.find = jest.fn().mockResolvedValue([]);

    // When
    const response = await request(app)
      .get('/shortlinks')
      .expect('Content-Type', /json/);

    // Then
    expect(URL.find).toHaveBeenCalled();
    expect(response.status).toBe(200);
    expect(response.body).toEqual('No short links found! Try creating some.');
  });
});


describe('Get Short Link By Slug', () => {

  // Tests that the function returns a short link successfully with status code 200.
  it('should return the link associated with the slug and status 200', async () => {
    // Given
    const mockShortLink = {
      'shortUrl': {
        'ios': 'http://localhost:5000/api/ios/ABCD123',
        'android': 'http://localhost:5000/api/android/ABCD123',
        'web': 'http://localhost:5000/api/web/ABCD123'
      },
      'slug': 'ABCD123',
      'orignUrl': 'https://www.google.com/'
    };

    URL.findOne = jest.fn().mockResolvedValue(mockShortLink);
    const slug = 'ABCD123';

    // When
    const response = await request(app).get(`/shortlinks/${slug}`);

    // Then
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ shortLink: mockShortLink });
  });

  // Tests that when a non-existent short link is requested, the API returns a 404 status code and a 'Short link not found' message.
  it('should return not found and status 404', async () => {
    // Given
    URL.findOne = jest.fn().mockResolvedValue(null);
    const slug = 'ABCD1---2345';

    // When
    const response = await request(app).get(`/shortlinks/${slug}`);

    // Then
    expect(response.status).toBe(404);
  });
});