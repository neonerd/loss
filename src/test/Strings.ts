import * as chai from "chai"
import { createSlug } from "../Strings"

var expect = chai.expect;

describe("createSlug Tests:", () => {

	describe("When creating slug:", () => {

		it("should be stripped of whitespace", (done) => {
			expect(createSlug('This Slug')).to.equal('ThisSlug')
			done()
		})

	})

});