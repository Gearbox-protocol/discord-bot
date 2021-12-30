import 'jest';
import { mockDeep } from 'jest-mock-extended';
import { Pool } from 'pg';
import { Logger } from 'src/API/logger';
import { allUsers, allTables } from '../queries';
import { initTables } from './init';

describe('init', () => {
  describe('initTables', () => {
    it('should be properly called', async () => {
      const pool = mockDeep<Pool>();
      const logger = mockDeep<Logger>();

      pool.query
        .calledWith(...([allUsers] as any))
        .mockReturnValue(
          Promise.resolve({ rows: [{ users_count: 0, applied_users_count: 0 }] }) as any,
        );

      await initTables(pool, logger);

      expect(pool.query).toHaveBeenCalledWith(allTables);
      expect(pool.query).toHaveBeenCalledWith(allUsers);
    });
  });
});
