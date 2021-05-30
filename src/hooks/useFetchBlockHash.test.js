import React from 'react';
import { mount } from 'enzyme';
import useFetchBlockHash from '../hooks/useFetchBlockHash';


describe('fetch block hash hook', () => {

    it('should work', () => {
        const Demo = () => {
            const [data, loading, onSearch] = useFetchBlockHash();
            return (
                <div>
                    <button
                        type="button"
                        onClick={() => {
                            onSearch('00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa');
                        }}
                    />
                    <span className='loading'>{loading.toString()}</span>
                </div>
            );
        };

        const wrapper = mount(<Demo />);
        expect(wrapper.find('.loading').text()).toBe('false');
        wrapper.find('button').simulate('click');
        expect(wrapper.find('.loading').text()).toBe('true');
    });

});
