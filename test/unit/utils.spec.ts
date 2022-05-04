import { generateNanoid } from "../../src/utils";
import { Constants } from "../../src/utils/Constants";

describe("App Utils", function () {

    it("Genrate uid", (done) => {
        const uid = generateNanoid(Constants.ALPHABET_UID, 30);
        expect(uid).toBeDefined();
        done()
    });

}    );