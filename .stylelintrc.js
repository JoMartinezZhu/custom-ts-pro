module.exports = {
    extends: 'stylelint-config-standard',
    ignoreFiles: ['node_modules/**/*.less', '**/*.md', '**/*.ts', '**/*.tsx', '**/*.js', '**/*.ejs'],
    rules: {
        indentation: 4,
        'no-missing-end-of-source-newline': null,
        'at-rule-no-unknown': null,
        'no-descending-specificity': null,
        'selector-pseudo-class-no-unknown': [
            true,
            {
                ignorePseudoClasses: ['global', 'local']
            }
        ]
    }
};
