import React from 'react';
import {shallow} from 'enzyme';

import {ProjectInstallPlatform} from 'app/views/projectInstall/platform';

describe('ProjectInstallPlatform', function() {
  describe('render()', function() {
    const baseProps = {
      organization: TestStubs.Organization(),
      project: TestStubs.Project(),
      location: {query: {}},
      platformData: {
        platforms: [
          {
            id: 'csharp',
            name: 'C#',
            integrations: [
              {
                id: 'csharp',
                type: 'language',
              },
            ],
          },
          {
            id: 'javascript',
            name: 'JavaScript',
            integrations: [
              {
                id: 'javascript-react',
                type: 'framework',
              },
            ],
          },
          {
            id: 'node',
            name: 'Node.js',
            integrations: [
              {
                id: 'node',
                type: 'language',
              },
              {
                id: 'node-connect',
                type: 'framework',
              },
            ],
          },
        ],
      },
    };

    it('should render NotFound if no matching integration/platform', function() {
      const props = {
        ...baseProps,
        params: {
          platform: 'lua',
        },
      };

      const wrapper = shallow(<ProjectInstallPlatform {...props} />, {
        organization: {id: '1337'},
      });

      expect(wrapper.find('NotFound')).toHaveLength(1);
    });

    it('should rendering Loading if integration/platform exists', function() {
      const props = {
        ...baseProps,
        params: {
          platform: 'node-connect',
        },
      };

      const wrapper = shallow(<ProjectInstallPlatform {...props} />, {
        organization: {id: '1337'},
      });

      expect(wrapper.find('LoadingIndicator')).toHaveLength(1);
    });
  });
});
